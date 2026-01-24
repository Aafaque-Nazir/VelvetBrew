import clientPromise from "@/lib/mongodb";

// Fetch all products
export async function getAllProducts() {
    try {
        const client = await clientPromise;
        const db = client.db("velvetbrew");
        const products = await db.collection("products").find({}).toArray();
        return products.map(p => ({ ...p, _id: p._id.toString() }));
    } catch (e) {
        console.error("Failed to fetch products", e);
        return [];
    }
}

// Fetch single product by ID (slug)
export async function getProductBySlug(slug) {
    try {
        const client = await clientPromise;
        const db = client.db("velvetbrew");
        const product = await db.collection("products").findOne({ id: slug });
        if (product) product._id = product._id.toString();
        return product;
    } catch (e) {
        return null;
    }
}

// Fetch by Category
export async function getProductsByCategory(category) {
     try {
        const client = await clientPromise;
        const db = client.db("velvetbrew");
        const products = await db.collection("products").find({ category: category }).toArray();
        return products.map(p => ({ ...p, _id: p._id.toString() }));
    } catch (e) {
        return [];
    }
}
