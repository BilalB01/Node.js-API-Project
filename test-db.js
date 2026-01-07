const { dbHelpers } = require('./src/config/database');

console.log('Database tabellen ophalen...\n');

try {
    // Haal alle tabellen op
    const tables = dbHelpers.all(`
    SELECT name FROM sqlite_master 
    WHERE type='table' 
    ORDER BY name;
  `);

    console.log('Beschikbare tabellen:');
    tables.forEach(table => {
        console.log(`  - ${table.name}`);
    });

    console.log('\nDatabase connectie werkt perfect!');

    // Test News tabel
    if (tables.some(t => t.name === 'news')) {
        console.log('\nNews tabel gevonden!');
        const newsCount = dbHelpers.get('SELECT COUNT(*) as count FROM news');
        console.log(`   Aantal news items: ${newsCount.count}`);

        // Toon kolommen van news tabel
        const newsColumns = dbHelpers.all('PRAGMA table_info(news)');
        console.log('   Kolommen:');
        newsColumns.forEach(col => {
            console.log(`     - ${col.name} (${col.type})`);
        });
    }

    // Test Posts tabel
    if (tables.some(t => t.name === 'posts')) {
        console.log('\nPosts tabel gevonden!');
        const postsCount = dbHelpers.get('SELECT COUNT(*) as count FROM posts');
        console.log(`   Aantal posts: ${postsCount.count}`);

        // Toon kolommen van posts tabel
        const postsColumns = dbHelpers.all('PRAGMA table_info(posts)');
        console.log('   Kolommen:');
        postsColumns.forEach(col => {
            console.log(`     - ${col.name} (${col.type})`);
        });
    }

} catch (error) {
    console.error('Fout bij database test:', error.message);
    process.exit(1);
}
