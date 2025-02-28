<?php
$articles = [
    ["title" => "Sri Lanka’s economy update", "category" => "Business", "published_date" => "2025-02-01"],
    ["title" => "Stock market trends", "category" => "Finance", "published_date" => "2025-02-03"],
    ["title" => "New investment policies", "category" => "Business", "published_date" => "2025-02-02"],
    ["title" => "Tourism growth in 2025", "category" => "Travel", "published_date" => "2025-02-04"],
    ["title" => "Real estate market boom", "category" => "Business", "published_date" => "2025-01-28"],
    ["title" => "Small business tax changes", "category" => "Business", "published_date" => "2025-02-03"],
    ["title" => "Investment in renewable energy", "category" => "Business", "published_date" => "2025-01-24"],
];

function filterAndSortArticles($articles, $category) {
    
    $filteredArticles = array_filter($articles, function ($article) use ($category) {
        return $article["category"] === $category;
    });

    
    usort($filteredArticles, function ($a, $b) {
        return strtotime($b["published_date"]) - strtotime($a["published_date"]);
    });

    return $filteredArticles;
}

$category = "Business";
$sortedArticles = filterAndSortArticles($articles, $category);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filtered News Articles</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 20px;
        }
        .news-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
        }
        .news-card {
            width: 300px;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background: white;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            text-align: left;
        }
        .news-card h2 {
            font-size: 18px;
            margin: 0 0 10px;
            color: #333;
        }
        .news-card p {
            font-size: 14px;
            color: #555;
        }
        .news-card .date {
            font-size: 12px;
            color: #888;
        }
    </style>
</head>
<body>

    <h1>Filtered News Articles (Business)</h1>
    <div class="news-container">
        <?php foreach ($sortedArticles as $article): ?>
            <div class="news-card">
                <h2><?php echo htmlspecialchars($article["title"]); ?></h2>
                <p class="date">Published on: <?php echo htmlspecialchars($article["published_date"]); ?></p>
                <p>Category: <strong><?php echo htmlspecialchars($article["category"]); ?></strong></p>
            </div>
        <?php endforeach; ?>
    </div>

</body>
</html>
