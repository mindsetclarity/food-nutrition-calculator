import fs from 'fs';
import path from 'path';

async function main() {
    console.log("USDA API Key Check\n");
    let key = process.env.USDA_API_KEY;

    try {
        const envPath = path.resolve('.env.local');
        if (fs.existsSync(envPath) && !key) {
            const content = fs.readFileSync(envPath, 'utf8');
            const lines = content.split('\n');
            for (const line of lines) {
                if (line.trim().startsWith('USDA_API_KEY=')) {
                    key = line.trim().split('=')[1].trim();
                    break;
                }
            }
        }
    } catch (e) {
        // Ignore read errors
    }

    if (!key) {
        console.log("* Key found: no");
        console.log("* Masked key: none");
        console.log("* Test query: banana");
        console.log("* HTTP status: N/A");
        console.log("* USDA response: N/A");
        console.log("* Foods returned: 0");
        console.log("* First result: N/A");
        console.log("  Final status: USDA API key not working \u274C");
        console.log("Reason: Missing key");
        return;
    }

    const masked = key.length > 8 ? `${key.substring(0, 4)}...${key.substring(key.length - 4)}` : '***';
    console.log("* Key found: yes");
    console.log(`* Masked key: ${masked}`);
    console.log("* Test query: banana");

    try {
        const res = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=banana&pageSize=1&api_key=${key}`);
        console.log(`* HTTP status: ${res.status}`);
        
        if (res.ok) {
            const data = await res.json();
            if (data && data.foods && data.foods.length > 0) {
                console.log("* USDA response: OK");
                console.log(`* Foods returned: ${data.foods.length}`);
                console.log(`* First result: ${data.foods[0].description}`);
                console.log("  Final status: USDA API key working \u2705");
            } else {
                console.log("* USDA response: Empty result");
                console.log("* Foods returned: 0");
                console.log("* First result: N/A");
                console.log("  Final status: USDA API key not working \u274C");
                console.log("Reason: Empty foods result");
            }
        } else {
            console.log("* USDA response: Error");
            console.log("* Foods returned: 0");
            console.log("* First result: N/A");
            console.log("  Final status: USDA API key not working \u274C");
            console.log(`Reason: HTTP ${res.status}`);
        }
    } catch (e) {
        console.log("* HTTP status: Error");
        console.log("* USDA response: N/A");
        console.log("* Foods returned: 0");
        console.log("* First result: N/A");
        console.log("  Final status: USDA API key not working \u274C");
        console.log(`Reason: Network failure - ${e.message}`);
    }
}

main();
