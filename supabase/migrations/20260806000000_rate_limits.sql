-- Rate limiting durável (substitui Map em memória, funciona em ambiente serverless)

CREATE TABLE IF NOT EXISTS rate_limits (
  ip            TEXT NOT NULL,
  route         TEXT NOT NULL,
  count         INTEGER NOT NULL DEFAULT 1,
  window_start  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (ip, route)
);

ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
-- Sem policies: só acessível via service_role (bypassa RLS), anon/authenticated não têm acesso.

-- Função atômica: incrementa contador da janela e diz se a requisição é permitida.
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_ip TEXT,
  p_route TEXT,
  p_window_seconds INT,
  p_max INT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count INT;
  v_window_start TIMESTAMPTZ;
BEGIN
  SELECT count, window_start INTO v_count, v_window_start
  FROM rate_limits
  WHERE ip = p_ip AND route = p_route
  FOR UPDATE;

  IF NOT FOUND THEN
    INSERT INTO rate_limits (ip, route, count, window_start)
    VALUES (p_ip, p_route, 1, NOW());
    RETURN TRUE;
  END IF;

  IF NOW() - v_window_start > (p_window_seconds || ' seconds')::INTERVAL THEN
    UPDATE rate_limits SET count = 1, window_start = NOW()
    WHERE ip = p_ip AND route = p_route;
    RETURN TRUE;
  END IF;

  IF v_count >= p_max THEN
    RETURN FALSE;
  END IF;

  UPDATE rate_limits SET count = count + 1
  WHERE ip = p_ip AND route = p_route;
  RETURN TRUE;
END;
$$;
