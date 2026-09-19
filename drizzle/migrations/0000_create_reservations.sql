CREATE TABLE public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama text NOT NULL,
  check_in date NOT NULL,
  durasi integer NOT NULL DEFAULT 1,
  tamu text NOT NULL,
  kamar text,
  fasilitas text[] NOT NULL DEFAULT '{}',
  catatan text,
  status text NOT NULL DEFAULT 'baru',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.reservations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reservations TO authenticated;
GRANT ALL ON public.reservations TO service_role;

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a reservation"
ON public.reservations FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated staff can read reservations"
ON public.reservations FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated staff can update reservations"
ON public.reservations FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated staff can delete reservations"
ON public.reservations FOR DELETE TO authenticated
USING (true);