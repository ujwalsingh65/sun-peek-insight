CREATE POLICY "Authenticated users can read energy production" ON public.energy_production FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read electricity rates" ON public.electricity_rates FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read alerts" ON public.alerts FOR SELECT TO authenticated USING (true);