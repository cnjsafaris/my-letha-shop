-- Insert the admin user with specified credentials
-- Note: This will only work after the user signs up with the specified email
INSERT INTO public.admin_users (id, email, full_name, role, is_active)
SELECT 
  id,
  'jabezmageto78@gmail.com',
  'Admin User',
  'super_admin',
  true
FROM auth.users 
WHERE email = 'jabezmageto78@gmail.com'
ON CONFLICT (email) DO UPDATE SET
  role = 'super_admin',
  is_active = true,
  updated_at = NOW();

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
DECLARE
  new_number TEXT;
BEGIN
  new_number := 'LS' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(NEXTVAL('order_number_seq')::TEXT, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for order numbers
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1;

-- Create trigger to auto-generate order numbers
CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_order_number ON public.orders;
CREATE TRIGGER trigger_set_order_number
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION set_order_number();
