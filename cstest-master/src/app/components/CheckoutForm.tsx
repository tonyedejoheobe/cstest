import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CheckoutFormProps {
  formType: 'shipping' | 'billing';
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export function CheckoutForm({ formType }: CheckoutFormProps) {
  const prefix = formType === 'shipping' ? 'shipping' : 'billing';

  return (
    <div className="space-y-4">
      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${prefix}-firstName`} className="text-xs font-semibold mb-1 block">
            First Name
          </Label>
          <Input
            id={`${prefix}-firstName`}
            name={`${prefix}-firstName`}
            placeholder="John"
            required
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-lastName`} className="text-xs font-semibold mb-1 block">
            Last Name
          </Label>
          <Input
            id={`${prefix}-lastName`}
            name={`${prefix}-lastName`}
            placeholder="Doe"
            required
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${prefix}-email`} className="text-xs font-semibold mb-1 block">
            Email Address
          </Label>
          <Input
            id={`${prefix}-email`}
            name={`${prefix}-email`}
            type="email"
            placeholder="john@example.com"
            required
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-phone`} className="text-xs font-semibold mb-1 block">
            Phone Number
          </Label>
          <Input
            id={`${prefix}-phone`}
            name={`${prefix}-phone`}
            type="tel"
            placeholder="(555) 555-0000"
            required
          />
        </div>
      </div>

      {/* Street Address */}
      <div>
        <Label htmlFor={`${prefix}-address`} className="text-xs font-semibold mb-1 block">
          Street Address
        </Label>
        <Input
          id={`${prefix}-address`}
          name={`${prefix}-address`}
          placeholder="123 Main Street"
          required
        />
      </div>

      {/* Address Line 2 */}
      <div>
        <Label htmlFor={`${prefix}-address2`} className="text-xs font-semibold mb-1 block">
          Apartment, Suite, etc. (Optional)
        </Label>
        <Input
          id={`${prefix}-address2`}
          name={`${prefix}-address2`}
          placeholder="Suite 100"
        />
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor={`${prefix}-city`} className="text-xs font-semibold mb-1 block">
            City
          </Label>
          <Input
            id={`${prefix}-city`}
            name={`${prefix}-city`}
            placeholder="New York"
            required
          />
        </div>
        <div>
          <Label htmlFor={`${prefix}-state`} className="text-xs font-semibold mb-1 block">
            State
          </Label>
          <Select>
            <SelectTrigger id={`${prefix}-state`}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map(state => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor={`${prefix}-zip`} className="text-xs font-semibold mb-1 block">
            ZIP Code
          </Label>
          <Input
            id={`${prefix}-zip`}
            name={`${prefix}-zip`}
            placeholder="10001"
            required
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <Label htmlFor={`${prefix}-country`} className="text-xs font-semibold mb-1 block">
          Country
        </Label>
        <Select defaultValue="United States">
          <SelectTrigger id={`${prefix}-country`}>
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="Mexico">Mexico</SelectItem>
            <SelectItem value="Other">Other (International Shipping)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
