import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface DataPoint {
  time: number;
  intensity: number;
}

export const SolarDataChart = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [solarWindSpeed, setSolarWindSpeed] = useState(400);
  const [flareIntensity, setFlareIntensity] = useState(5);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    // Generate data based on solar wind speed
    const data: DataPoint[] = Array.from({ length: 50 }, (_, i) => ({
      time: i,
      intensity: Math.sin(i / 5) * (solarWindSpeed / 10) + solarWindSpeed / 10 + Math.random() * 20,
    }));

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Scales
    const x = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity) || 100])
      .range([height - margin.bottom, margin.top]);

    // Line generator
    const line = d3
      .line<DataPoint>()
      .x((d) => x(d.time))
      .y((d) => y(d.intensity))
      .curve(d3.curveMonotoneX);

    // Add gradient
    const gradient = svg
      .append("defs")
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", 0)
      .attr("y2", 0);

    gradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "hsl(25, 95%, 55%)");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "hsl(180, 80%, 50%)");

    // Draw line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Add area under curve
    const area = d3
      .area<DataPoint>()
      .x((d) => x(d.time))
      .y0(height - margin.bottom)
      .y1((d) => y(d.intensity))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(data)
      .attr("fill", "url(#line-gradient)")
      .attr("opacity", 0.2)
      .attr("d", area);

    // Add axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(10))
      .attr("color", "hsl(210, 20%, 70%)");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .attr("color", "hsl(210, 20%, 70%)");

    // Add labels
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "hsl(210, 40%, 98%)")
      .attr("font-size", "12px")
      .text("Time (hours)");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("fill", "hsl(210, 40%, 98%)")
      .attr("font-size", "12px")
      .text("Solar Wind Intensity (km/s)");
  }, [solarWindSpeed]);

  return (
    <div className="space-y-6">
      <Card className="glass p-6">
        <h3 className="text-xl font-bold mb-4 text-primary">
          Solar Wind Monitor
        </h3>
        <div className="flex justify-center mb-6">
          <svg ref={svgRef} className="overflow-visible" />
        </div>

        <div className="space-y-4">
          <div className="glass p-4 rounded-xl space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Solar Wind Speed</label>
              <span className="text-sm text-primary font-bold">{solarWindSpeed} km/s</span>
            </div>
            <Slider
              value={[solarWindSpeed]}
              onValueChange={(v) => setSolarWindSpeed(v[0])}
              min={300}
              max={800}
              step={50}
              className="w-full"
            />
          </div>

          <div className="glass p-4 rounded-xl space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Flare Intensity</label>
              <span className="text-sm text-secondary font-bold">
                {flareIntensity >= 8 ? "X-Class" : flareIntensity >= 5 ? "M-Class" : "C-Class"}
              </span>
            </div>
            <Slider
              value={[flareIntensity]}
              onValueChange={(v) => setFlareIntensity(v[0])}
              min={1}
              max={10}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-primary/20">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">Impact Analysis:</span>{" "}
            {solarWindSpeed > 600
              ? "High solar wind speeds may cause GPS disruptions and increased aurora visibility."
              : "Normal solar wind activity. Minimal impact on Earth systems."}
          </p>
        </div>
      </Card>
    </div>
  );
};
