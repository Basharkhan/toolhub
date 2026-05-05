import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Badge } from '@/components/ui/badge'

const BMI_CATEGORIES = [
  { max: 18.5, label: 'Underweight', badge: 'border-amber-200 bg-amber-50 text-amber-700' },
  { max: 25, label: 'Normal weight', badge: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  { max: 30, label: 'Overweight', badge: 'border-orange-200 bg-orange-50 text-orange-700' },
  { max: Infinity, label: 'Obese', badge: 'border-red-200 bg-red-50 text-red-700' },
]

function getBmiCategory(bmi) {
  return BMI_CATEGORIES.find((c) => bmi < c.max)
}

function isValidPositive(value) {
  const n = parseFloat(value)
  return !isNaN(n) && n > 0
}

function BmiCalculatorPage() {
  const [unit, setUnit] = useState('metric')
  const [weight, setWeight] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [bmi, setBmi] = useState(null)
  const [touched, setTouched] = useState({})

  const errors = {}
  if (unit === 'metric') {
    if (!isValidPositive(weight)) errors.weight = 'Enter a valid weight'
    if (!isValidPositive(heightCm)) errors.heightCm = 'Enter a valid height'
  } else {
    if (!isValidPositive(weight)) errors.weight = 'Enter a valid weight'
    const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
    if (totalInches <= 0) errors.heightFt = 'Enter a valid height'
  }

  const hasErrors = Object.keys(errors).length > 0

  function handleUnitChange(nextUnit) {
    if (nextUnit === unit) return
    setUnit(nextUnit)
    setWeight('')
    setHeightCm('')
    setHeightFt('')
    setHeightIn('')
    setBmi(null)
    setTouched({})
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function calculateBmi() {
    if (hasErrors) return

    let bmiValue
    if (unit === 'metric') {
      const w = parseFloat(weight)
      const h = parseFloat(heightCm)
      bmiValue = w / ((h / 100) ** 2)
    } else {
      const w = parseFloat(weight)
      const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
      bmiValue = (w / (totalInches ** 2)) * 703
    }

    setBmi(Math.round(bmiValue * 10) / 10)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !hasErrors) {
      calculateBmi()
    }
  }

  const category = bmi ? getBmiCategory(bmi) : null

  return (
    <section className="py-8 sm:py-10">
      <Card className="mx-auto max-w-[480px]">
        <CardHeader className="text-center">
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>Calculate your body mass index</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <ToggleGroup
            type="single"
            value={unit}
            onValueChange={(val) => val && handleUnitChange(val)}
            variant="outline"
            spacing={0}
            className="w-full"
          >
            <ToggleGroupItem value="metric" className="flex-1">
              Metric
            </ToggleGroupItem>
            <ToggleGroupItem value="imperial" className="flex-1">
              Imperial
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bmi-weight">
                Weight ({unit === 'metric' ? 'kg' : 'lb'})
              </Label>
              <Input
                id="bmi-weight"
                type="number"
                min="0"
                step="any"
                inputMode="decimal"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value)
                  setBmi(null)
                }}
                onBlur={() => handleBlur('weight')}
                onKeyDown={handleKeyDown}
                placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                aria-invalid={touched.weight && errors.weight ? true : undefined}
                className="h-10"
              />
              {touched.weight && errors.weight && (
                <p className="text-sm text-destructive">{errors.weight}</p>
              )}
            </div>

            {unit === 'metric' ? (
              <div className="space-y-2">
                <Label htmlFor="bmi-height-cm">Height (cm)</Label>
                <Input
                  id="bmi-height-cm"
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={heightCm}
                  onChange={(e) => {
                    setHeightCm(e.target.value)
                    setBmi(null)
                  }}
                  onBlur={() => handleBlur('heightCm')}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g. 175"
                  aria-invalid={touched.heightCm && errors.heightCm ? true : undefined}
                  className="h-10"
                />
                {touched.heightCm && errors.heightCm && (
                  <p className="text-sm text-destructive">{errors.heightCm}</p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="bmi-height-ft">Height (ft)</Label>
                  <Input
                    id="bmi-height-ft"
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={heightFt}
                    onChange={(e) => {
                      setHeightFt(e.target.value)
                      setBmi(null)
                    }}
                    onBlur={() => handleBlur('heightFt')}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. 5"
                    aria-invalid={touched.heightFt && errors.heightFt ? true : undefined}
                    className="h-10"
                  />
                  {touched.heightFt && errors.heightFt && (
                    <p className="text-sm text-destructive">{errors.heightFt}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bmi-height-in">Height (in)</Label>
                  <Input
                    id="bmi-height-in"
                    type="number"
                    min="0"
                    step="any"
                    inputMode="decimal"
                    value={heightIn}
                    onChange={(e) => {
                      setHeightIn(e.target.value)
                      setBmi(null)
                    }}
                    onBlur={() => handleBlur('heightIn')}
                    onKeyDown={handleKeyDown}
                    placeholder="e.g. 10"
                    aria-invalid={touched.heightIn && errors.heightFt ? true : undefined}
                    className="h-10"
                  />
                  {touched.heightIn && errors.heightFt && (
                    <p className="text-sm text-destructive">{errors.heightFt}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={calculateBmi}
            disabled={hasErrors}
            className="h-10 w-full"
          >
            Calculate BMI
          </Button>

          {bmi !== null && category && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Your BMI
                </p>

                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-5xl font-bold tracking-tight text-foreground">
                    {bmi}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    kg/m&sup2;
                  </span>
                </div>

                <Badge variant="outline" className={`mt-3 ${category.badge}`}>
                  {category.label}
                </Badge>

                <div className="mt-5">
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
                    <div className="w-[18.5%] rounded-l-full bg-amber-400" />
                    <div className="w-[6.5%] bg-emerald-400" />
                    <div className="w-[5%] bg-orange-400" />
                    <div className="flex-1 rounded-r-full bg-red-400" />
                  </div>
                  <div className="mt-1.5 flex justify-between px-0.5 text-[11px] font-medium text-muted-foreground">
                    <span>0</span>
                    <span>18.5</span>
                    <span>25</span>
                    <span>30</span>
                    <span>40+</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </section>
  )
}

export default BmiCalculatorPage
