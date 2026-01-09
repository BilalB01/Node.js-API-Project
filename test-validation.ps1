# API Validatie Test Script
# Dit script test alle validatie regels

Write-Host "=== RECEPTENWEB API VALIDATIE TESTS ===" -ForegroundColor Green
Write-Host ""

$baseUrl = "http://localhost:3000"

# Test 1: Geldige News POST
Write-Host "Test 1: Geldige News POST (zou moeten werken)" -ForegroundColor Cyan
$validNews = @{
    title = "Nieuwe Recepten Toegevoegd"
    content = "We hebben vandaag 10 nieuwe heerlijke recepten toegevoegd aan onze database."
    author = "Admin Team"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/news" -Method Post -Body $validNews -ContentType "application/json"
    Write-Host "✓ GESLAAGD: News item aangemaakt" -ForegroundColor Green
    Write-Host "  ID: $($response.data.id)" -ForegroundColor Gray
} catch {
    Write-Host "✗ GEFAALD: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Title te kort (< 5 karakters)
Write-Host "Test 2: Title te kort - moet falen" -ForegroundColor Cyan
$shortTitle = @{
    title = "Test"
    content = "Dit is een test met een te korte titel."
    author = "Admin"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/news" -Method Post -Body $shortTitle -ContentType "application/json"
    Write-Host "✗ FOUT: Validatie werkt niet! Dit had moeten falen." -ForegroundColor Red
} catch {
    Write-Host "✓ CORRECT: Validatie werkt!" -ForegroundColor Green
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "  Foutmelding: $($errorResponse.details[0].message)" -ForegroundColor Gray
}
Write-Host ""

# Test 3: Author met cijfers (niet toegestaan)
Write-Host "Test 3: Author met cijfers - moet falen" -ForegroundColor Cyan
$authorWithNumbers = @{
    title = "Test Artikel"
    content = "Dit is een test artikel met een auteur naam die cijfers bevat."
    author = "Admin123"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/news" -Method Post -Body $authorWithNumbers -ContentType "application/json"
    Write-Host "✗ FOUT: Validatie werkt niet! Dit had moeten falen." -ForegroundColor Red
} catch {
    Write-Host "✓ CORRECT: Validatie werkt!" -ForegroundColor Green
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "  Foutmelding: $($errorResponse.details[0].message)" -ForegroundColor Gray
}
Write-Host ""

# Test 4: Content te kort (< 10 karakters)
Write-Host "Test 4: Content te kort - moet falen" -ForegroundColor Cyan
$shortContent = @{
    title = "Test Artikel"
    content = "Te kort"
    author = "Admin"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/news" -Method Post -Body $shortContent -ContentType "application/json"
    Write-Host "✗ FOUT: Validatie werkt niet! Dit had moeten falen." -ForegroundColor Red
} catch {
    Write-Host "✓ CORRECT: Validatie werkt!" -ForegroundColor Green
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "  Foutmelding: $($errorResponse.details[0].message)" -ForegroundColor Gray
}
Write-Host ""

# Test 5: Geldige Post
Write-Host "Test 5: Geldige Post (zou moeten werken)" -ForegroundColor Cyan
$validPost = @{
    content = "Dit is een geldige post met voldoende karakters om de validatie te passeren."
    user_id = 1
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/posts" -Method Post -Body $validPost -ContentType "application/json"
    Write-Host "✓ GESLAAGD: Post aangemaakt" -ForegroundColor Green
    Write-Host "  ID: $($response.data.id)" -ForegroundColor Gray
} catch {
    Write-Host "✗ GEFAALD: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 6: Post content te kort
Write-Host "Test 6: Post content te kort - moet falen" -ForegroundColor Cyan
$shortPostContent = @{
    content = "Te kort"
    user_id = 1
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/posts" -Method Post -Body $shortPostContent -ContentType "application/json"
    Write-Host "✗ FOUT: Validatie werkt niet! Dit had moeten falen." -ForegroundColor Red
} catch {
    Write-Host "✓ CORRECT: Validatie werkt!" -ForegroundColor Green
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "  Foutmelding: $($errorResponse.details[0].message)" -ForegroundColor Gray
}
Write-Host ""

# Test 7: Ongeldige limit (> 100)
Write-Host "Test 7: Limit te hoog (>100) - moet falen" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/news?limit=150" -Method Get
    Write-Host "✗ FOUT: Validatie werkt niet! Dit had moeten falen." -ForegroundColor Red
} catch {
    Write-Host "✓ CORRECT: Validatie werkt!" -ForegroundColor Green
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "  Foutmelding: $($errorResponse.details[0].message)" -ForegroundColor Gray
}
Write-Host ""

# Test 8: Ongeldige ID (niet numeriek)
Write-Host "Test 8: Ongeldige ID (tekst ipv nummer) - moet falen" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/news/abc" -Method Get
    Write-Host "✗ FOUT: Validatie werkt niet! Dit had moeten falen." -ForegroundColor Red
} catch {
    Write-Host "✓ CORRECT: Validatie werkt!" -ForegroundColor Green
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "  Foutmelding: $($errorResponse.details[0].message)" -ForegroundColor Gray
}
Write-Host ""

# Test 9: Zoekterm te kort
Write-Host "Test 9: Zoekterm te kort (<2 chars) - moet falen" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/news/search?q=a" -Method Get
    Write-Host "✗ FOUT: Validatie werkt niet! Dit had moeten falen." -ForegroundColor Red
} catch {
    Write-Host "✓ CORRECT: Validatie werkt!" -ForegroundColor Green
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    Write-Host "  Foutmelding: $($errorResponse.details[0].message)" -ForegroundColor Gray
}
Write-Host ""

# Test 10: Geldige GET met paginatie
Write-Host "Test 10: Geldige GET met paginatie (zou moeten werken)" -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/news?limit=5&offset=0" -Method Get
    Write-Host "✓ GESLAAGD: $($response.data.Count) news items opgehaald" -ForegroundColor Green
    Write-Host "  Totaal: $($response.pagination.total)" -ForegroundColor Gray
} catch {
    Write-Host "✗ GEFAALD: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "=== TESTS VOLTOOID ===" -ForegroundColor Green
Write-Host ""
Write-Host "Samenvatting:" -ForegroundColor Yellow
Write-Host "- Geldige requests zouden moeten werken (groen)" -ForegroundColor Gray
Write-Host "- Ongeldige requests zouden moeten falen met validatie errors (groen)" -ForegroundColor Gray
Write-Host "- Als iets rood is, werkt de validatie niet correct" -ForegroundColor Gray
