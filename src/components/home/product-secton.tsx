import { Product } from "@/lib/types";
import { ProductCard } from "../common/product-card";
export function ProductSection() {
  const products: Product[] = [
    {
      id: "1",
      name: "Premium Hair Pomade",
      description:
        "Strong hold, natural finish hair styling pomade for all hair types. Perfect for creating textured, defined styles that last all day.",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Hair Care",
      stock: 50,
    },
    {
      id: "2",
      name: "Beard Oil",
      description:
        "Nourishing beard oil for soft, manageable facial hair. Enriched with argan and jojoba oils to condition and tame even the most unruly beards.",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Beard Care",
      stock: 35,
    },
    {
      id: "3",
      name: "Luxury Shaving Cream",
      description:
        "Rich, creamy formula that creates a luxurious lather for a smooth, comfortable shave. Helps prevent irritation and razor burn.",
      price: 19.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Grooming",
      stock: 42,
    },
    {
      id: "4",
      name: "Facial Cleanser",
      description:
        "Gentle yet effective facial cleanser that removes dirt and oil without stripping the skin. Perfect for daily use.",
      price: 22.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Skin Care",
      stock: 28,
    },
    {
      id: "5",
      name: "Premium Beard Brush",
      description:
        "Handcrafted boar bristle beard brush that helps distribute oils and style your beard. The perfect tool for daily grooming.",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Tools",
      stock: 15,
    },
    {
      id: "6",
      name: "Aftershave Balm",
      description:
        "Soothing aftershave balm that calms and hydrates the skin after shaving. Alcohol-free formula prevents dryness and irritation.",
      price: 26.99,
      image: "/placeholder.svg?height=400&width=400",
      category: "Grooming",
      stock: 8,
    },
  ];

  return (
    <section className="w-full ">
      <div className="text-zinc-900">
        <h2 className="text-4xl font-bold text-center mb-8">
          Our Premium Products
        </h2>
        <p className="text-xl text-center text-muted-foreground mb-12">
          Discover our handpicked grooming and wellness products for your care.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />  
          ))}
        </div>
      </div>
    </section>
  );
}
