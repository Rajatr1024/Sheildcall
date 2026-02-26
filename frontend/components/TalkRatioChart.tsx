"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

type Props = {
  ratio: Record<string, number>;
};

export default function TalkRatioChart({
  ratio,
}: Props) {
  const data = Object.entries(ratio).map(
    ([speaker, value]) => ({
      name: speaker,
      value,
    })
  );

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="font-semibold mb-4">
        Talk Ratio
      </h2>

      <PieChart width={250} height={200}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={80}
        >
          <Cell fill="#3B82F6" />
          <Cell fill="#10B981" />
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}