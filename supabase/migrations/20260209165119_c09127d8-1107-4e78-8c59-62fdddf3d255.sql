ALTER TABLE public.solar_panel_configs DROP CONSTRAINT panel_size_range;
ALTER TABLE public.solar_panel_configs ADD CONSTRAINT panel_size_range CHECK (panel_size >= 0.001 AND panel_size <= 100);