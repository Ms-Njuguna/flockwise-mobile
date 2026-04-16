export const generateInsights = (eggs, birdSales, expenses, flock) => {
  let insights = [];

  const totalEggs = eggs.reduce((sum, e) => sum + e.eggs_collected, 0);
  const totalSold = eggs.reduce((sum, e) => sum + e.sold, 0);
  const totalBroken = eggs.reduce((sum, e) => sum + e.broken, 0);

  const eggIncome = eggs.reduce(
    (sum, e) => sum + e.sold * e.price_per_egg,
    0
  );

  const birdIncome = birdSales.reduce(
    (sum, b) => sum + b.number_sold * b.price_per_bird,
    0
  );

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const profit = eggIncome + birdIncome - totalExpenses;

  const totalLayers = flock
    .filter((f) => f.type === "layers")
    .reduce((sum, f) => sum + f.count, 0);

  // 🧠 LOGIC

  if (totalLayers > 0) {
    const expectedEggs = totalLayers * 0.7;

    if (totalEggs < expectedEggs) {
      insights.push("⚠️ Low egg production — check lighting & feed quality");
    }

    if (totalEggs / totalLayers < 0.5) {
      insights.push("🐔 Some hens may not be laying — consider selling");
    }
  }

  if (totalBroken > 10) {
    insights.push("🥚 High egg breakage — improve nesting boxes");
  }

  if (profit < 0) {
    insights.push("❌ You are making a loss — reduce feed or increase sales");
  }

  if (totalExpenses > eggIncome) {
    insights.push("💸 Expenses too high compared to egg income");
  }

  if (profit > 0) {
    insights.push("✅ You're profitable — keep optimizing!");
  }

  return insights;
};