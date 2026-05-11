import React, { useState, useEffect } from "react";
import {
  Zap,
  Fuel,
  Gauge,
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Info,
  Battery,
  MapPin,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "./assets/hero.png";

const InputField = ({ label, icon: Icon, value, onChange, unit, tooltip }) => (
  <div className="flex flex-col gap-2 mb-6 group">
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-slate-400 group-focus-within:text-sky-400 transition-colors flex items-center gap-1.5">
        <Icon size={14} />
        {label}
      </label>
      {tooltip && (
        <div className="group/tooltip relative">
          <Info size={12} className="text-slate-500 cursor-help" />
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-[10px] text-slate-300 rounded border border-slate-700 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
            {tooltip}
          </div>
        </div>
      )}
    </div>
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => {
          let val = e.target.value;
          if (val.length > 1 && val.startsWith("0") && val[1] !== ".") {
            val = val.replace(/^0+/, "");
          }
          onChange(val);
        }}
        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all placeholder-slate-600 hover:border-slate-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        placeholder="0.00"
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 uppercase">
        {unit}
      </span>
    </div>
  </div>
);

const ResultCard = ({ title, value, icon: Icon, color, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass p-6 rounded-2xl relative overflow-hidden"
  >
    <div
      className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-10 rounded-full ${color}`}
    />
    <div className="flex items-center gap-4 mb-4">
      <div className={`p-3 ${color} squircle flex items-center justify-center shadow-lg ${color.replace('bg-', 'shadow-')}/20`}>
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>
    </div>
    <div className="text-3xl font-bold text-slate-100 tracking-tight">
      {value}
    </div>
  </motion.div>
);

function App() {
  const [odometer, setOdometer] = useState("15000");
  const [electricityRate, setElectricityRate] = useState("8");
  const [fuelPrice, setFuelPrice] = useState("105");
  const [fuelMileage, setFuelMileage] = useState("15"); // km/l
  const [batteryCapacity, setBatteryCapacity] = useState("30"); // kWh
  const [actualRange, setActualRange] = useState("200"); // km
  const [evEfficiency, setEvEfficiency] = useState(15); // kWh/100km

  const [savings, setSavings] = useState(0);
  const [fuelCost, setFuelCost] = useState(0);
  const [evCost, setEvCost] = useState(0);

  useEffect(() => {
    const battery = parseFloat(batteryCapacity) || 0;
    const range = parseFloat(actualRange) || 0;
    const dist = parseFloat(odometer) || 0;
    const pMil = parseFloat(fuelMileage) || 0;
    const pPrice = parseFloat(fuelPrice) || 0;
    const eRate = parseFloat(electricityRate) || 0;

    // Calculate efficiency based on battery and range
    const efficiency = range > 0 ? (battery / range) * 100 : 0;
    setEvEfficiency(efficiency);

    const pCost = pMil > 0 ? (dist / pMil) * pPrice : 0;
    const eCost = dist * (efficiency / 100) * eRate;

    setFuelCost(pCost);
    setEvCost(eCost);
    setSavings(pCost - eCost);
  }, [
    odometer,
    electricityRate,
    fuelPrice,
    fuelMileage,
    batteryCapacity,
    actualRange,
  ]);

  const formatCurrency = (val, digits = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(val);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-sky-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-lg shadow-sky-500/20">
              <Zap className="text-white" size={32} fill="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                VoltSave
              </h1>
              <p className="text-slate-400 text-sm">EV Savings Calculator</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
              Live Calculations
            </span>
          </motion.div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <section className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-2 mb-8">
                <Calculator className="text-sky-400" size={20} />
                <h2 className="text-lg font-semibold text-slate-100">
                  Vehicle Parameters
                </h2>
              </div>

              <InputField
                label="Total Distance"
                icon={Gauge}
                value={odometer}
                onChange={setOdometer}
                unit="km"
                tooltip="The total distance you drive in a year or over the period you want to calculate."
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Electricity Rate"
                  icon={IndianRupee}
                  value={electricityRate}
                  onChange={setElectricityRate}
                  unit="per kWh"
                  tooltip="Cost of electricity per unit (kWh) from your utility provider."
                />
                <div className="flex flex-col gap-2 mb-6 opacity-60">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                    <Zap size={14} />
                    Auto-Efficiency
                  </label>
                  <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-400 text-sm italic">
                    {evEfficiency.toFixed(1)} kWh/100km
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 mt-2">
                <Battery className="text-sky-400" size={16} />
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  EV Specifications
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Battery Capacity"
                  icon={Battery}
                  value={batteryCapacity}
                  onChange={setBatteryCapacity}
                  unit="kWh"
                  tooltip="The usable battery capacity of your EV."
                />
                <InputField
                  label="Actual Range"
                  icon={MapPin}
                  value={actualRange}
                  onChange={setActualRange}
                  unit="km"
                  tooltip="The actual range you get on a full charge."
                />
              </div>

              <div className="h-px bg-slate-700/50 my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Petrol/Diesel Price"
                  icon={IndianRupee}
                  value={fuelPrice}
                  onChange={setFuelPrice}
                  unit="per Litre"
                />
                <InputField
                  label="Petrol/Diesel Mileage"
                  icon={Fuel}
                  value={fuelMileage}
                  onChange={setFuelMileage}
                  unit="km/Litre"
                  tooltip="Average mileage of the petrol/diesel vehicle you are comparing with."
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-sky-500/10 border border-sky-500/20 p-6 rounded-2xl flex items-start gap-4"
            >
              <div className="p-2 bg-sky-500/20 rounded-lg">
                <CheckCircle2 size={20} className="text-sky-400" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-sky-400 mb-1">
                  Savings Insight
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Switching to an EV could save you approximately{" "}
                  <span className="text-slate-100 font-bold">
                    {Math.round((savings / fuelCost) * 100)}%
                  </span>{" "}
                  on fuel costs based on your current inputs.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Results Section */}
          <section className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden p-10 rounded-3xl bg-gradient-to-br from-sky-600/20 to-blue-600/20 border border-white/10"
            >
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <img
                  src={heroImage}
                  alt="EV Dashboard"
                  className="object-cover w-full h-full object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0f172a]" />
              </div>

              <div className="relative z-10">
                <p className="text-sky-400 font-medium mb-2 uppercase tracking-[0.2em] text-[10px]">
                  Total Potential Savings
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-6xl font-extrabold text-white tracking-tighter">
                    {formatCurrency(savings)}
                  </h2>
                  <span className="text-slate-400 font-medium">INR</span>
                </div>
                <p className="mt-4 text-slate-400 text-sm max-w-md">
                  This is the amount you would save over{" "}
                  {Number(odometer).toLocaleString()} km by driving an EV
                  instead of a petrol/diesel vehicle.
                </p>
              </div>

              {/* Decorative line chart background (static mockup) */}
              <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 pointer-events-none">
                <svg
                  viewBox="0 0 400 100"
                  className="w-full h-full preserve-3d"
                >
                  <path
                    d="M0 80 Q 50 70, 100 85 T 200 60 T 300 75 T 400 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-sky-400"
                  />
                  <path
                    d="M0 80 Q 50 70, 100 85 T 200 60 T 300 75 T 400 40 L 400 100 L 0 100 Z"
                    fill="url(#grad)"
                    className="text-sky-400"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop
                        offset="0%"
                        style={{ stopColor: "currentColor", stopOpacity: 0.5 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "currentColor", stopOpacity: 0 }}
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultCard
                title="Petrol/Diesel Cost"
                subtitle="Estimated Fuel Expense"
                value={formatCurrency(fuelCost)}
                icon={Fuel}
                color="bg-red-500"
              />
              <ResultCard
                title="EV Cost"
                subtitle="Estimated Energy Expense"
                value={formatCurrency(evCost)}
                icon={Zap}
                color="bg-green-500"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-8 rounded-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                  <TrendingUp size={18} className="text-sky-400" />
                  Cost Comparison Breakdown
                </h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-[10px] text-slate-400 uppercase">
                      Petrol/Diesel
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[10px] text-slate-400 uppercase">
                      EV
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400 font-medium">
                      Energy Efficiency
                    </span>
                    <span className="text-slate-100 font-bold">
                      {fuelMileage} km/L vs {evEfficiency} kWh/100km
                    </span>
                  </div>
                  <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      className="absolute inset-0 bg-rose-500/30"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "20%" }}
                      className="absolute inset-0 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 italic">
                    Note: EV energy density is significantly higher, leading to
                    better cost efficiency.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                      Savings per KM
                    </p>
                    <p className="text-lg font-bold text-slate-200">
                      {formatCurrency(
                        savings / (parseFloat(odometer) || 1),
                        2
                      )}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                      Petrol/Diesel Cost per KM
                    </p>
                    <p className="text-lg font-bold text-slate-200">
                      {formatCurrency(
                        fuelCost / (parseFloat(odometer) || 1),
                        2
                      )}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">
                      EV Cost per KM
                    </p>
                    <p className="text-lg font-bold text-slate-200">
                      {formatCurrency(
                        evCost / (parseFloat(odometer) || 1),
                        2
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            &copy; 2026 VoltSave. Helping you transition to a sustainable
            future.
          </p>
          <p className="text-slate-600 text-[10px] text-center md:text-right flex items-center justify-center md:justify-end gap-1">
            Made with{" "}
            <Heart size={10} className="text-rose-500 fill-rose-500" /> by{" "}
            <a
              href="https://mistjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 font-medium hover:text-sky-400 transition-colors"
            >
              mistjs
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
