"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Save, ArrowLeft, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductForm({ initialData = {}, isNew = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "machines",
    price: "",
    description: "",
    tagline: "",
    // Arrays
    gallery: [],
    features: [],
    // Specs (Object)
    specs: {},
    // Beans specific
    roast: "",
    notes: "",
    ...initialData,
  });

  // Helper for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ... logic for upload
  const handleUpload = async (file, field) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        if (field === "gallery") {
          setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, data.url],
          }));
        } else if (field === "newColor") {
          setNewColor((prev) => ({ ...prev, image: data.url }));
        } else {
          // For main image or colors, specific handling might be needed but for now let's generalise or assume gallery mainly
          // If user wants main image, we might need a dedicated field
        }
      } else {
        alert("Upload failed");
      }
    } catch (e) {
      alert("Upload error");
    }
  };

  // Helper to remove gallery item
  const removeGalleryItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Helper for Arrays (features, gallery) - Simply comma separated for MVP ease
  const handleArrayChange = (e, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value.split(",").map((s) => s.trim()),
    }));
  };

  // Helper for Specs (Key-Value pairs)
  const handleSpecChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      specs: { ...prev.specs, [key]: value },
    }));
  };

  const [newSpecName, setNewSpecName] = useState("");
  const [isAddingSpec, setIsAddingSpec] = useState(false);

  const handleAddSpec = () => {
    if (!newSpecName.trim()) return;
    handleSpecChange(newSpecName, "Value");
    setNewSpecName("");
    setIsAddingSpec(false);
  };

  const removeSpec = (key) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData((prev) => ({ ...prev, specs: newSpecs }));
  };

  // Color Management
  const [newColor, setNewColor] = useState({
    name: "",
    hex: "#000000",
    image: "",
  });

  const addColor = () => {
    if (!newColor.name || !newColor.image) return;
    setFormData((prev) => ({
      ...prev,
      colors: [
        ...(prev.colors || []),
        { ...newColor, id: "color-" + Date.now() },
      ],
    }));
    setNewColor({ name: "", hex: "#000000", image: "" });
  };

  const removeColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = isNew ? "POST" : "PUT";
    const url = isNew
      ? "/api/admin/products"
      : `/api/admin/products/${formData.id}`;

    try {
      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price), // Ensure number
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Failed to save product");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link
            href="/admin/products"
            className="text-white/40 hover:text-white flex items-center gap-2 mb-2 transition-colors text-sm"
          >
            <ArrowLeft size={14} /> Back to Products
          </Link>
          <h1 className="text-3xl font-bold text-white">
            {isNew ? "New Product" : `Edit ${formData.name}`}
          </h1>
        </div>
        <div className="flex gap-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="bg-[#151515] border border-white/10 rounded-lg p-3 text-white focus:border-bronze-500 outline-none"
          >
            <option value="machines">Machines</option>
            <option value="accessories">Accessories</option>
            <option value="beans">Beans</option>
          </select>
          <Button disabled={loading} className="gap-2">
            <Save size={18} /> {loading ? "Saving..." : "Save Product"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Core Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#151515] p-6 rounded-2xl border border-white/5 space-y-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Product Details
            </h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase">
                  Name
                </label>
                <input
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-bronze-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase">
                  Price (₹)
                </label>
                <input
                  name="price"
                  type="number"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-bronze-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">
                Unique ID (Slug)
              </label>
              <input
                name="id"
                required
                value={formData.id}
                onChange={handleChange}
                disabled={!isNew}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-bronze-500 outline-none transition-all font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">
                Tagline / Subheading
              </label>
              <input
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-bronze-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase">
                Description
              </label>
              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-bronze-500 outline-none transition-all leading-relaxed"
              />
            </div>
          </div>

          {/* Conditional: Specs & Colors for Machines only */}
          {formData.category === "machines" && (
            <>
              {/* Color Variants Section */}
              <div className="bg-[#151515] p-6 rounded-2xl border border-white/5 space-y-6">
                <h3 className="text-lg font-bold text-white">Color Variants</h3>

                <div className="space-y-3">
                  {/* List of added colors */}
                  {(formData.colors || []).map((color, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5"
                    >
                      <div
                        className="w-10 h-10 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden relative border border-white/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={color.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white text-sm">
                          {color.name}
                        </p>
                        <p className="text-xs text-white/40 font-mono">
                          {color.hex}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeColor(idx)}
                        className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  {/* Add New Color Form */}
                  <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-4">
                    <p className="text-xs font-bold text-white/40 uppercase">
                      Add New Variant
                    </p>
                    <div className="grid grid-cols-[auto_1fr] gap-4">
                      <input
                        type="color"
                        value={newColor.hex}
                        onChange={(e) =>
                          setNewColor({ ...newColor, hex: e.target.value })
                        }
                        className="w-12 h-12 rounded cursor-pointer bg-transparent border-none p-0"
                      />
                      <input
                        placeholder="Color Name (e.g. Matte Black)"
                        value={newColor.name}
                        onChange={(e) =>
                          setNewColor({ ...newColor, name: e.target.value })
                        }
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-bronze-500 outline-none"
                      />
                    </div>

                    {/* Compact Upload for Color */}
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label
                          className={`flex items-center justify-center gap-2 w-full p-3 border border-dashed border-white/10 rounded-lg cursor-pointer hover:bg-white/5 hover:border-white/30 transition-all ${newColor.image ? "border-bronze-500/50 bg-bronze-500/10" : ""}`}
                        >
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                              e.target.files?.[0] &&
                              handleUpload(e.target.files[0], "newColor")
                            }
                          />
                          <Plus
                            size={16}
                            className={
                              newColor.image
                                ? "text-bronze-500"
                                : "text-white/40"
                            }
                          />
                          <span className="text-xs font-bold text-white/60">
                            {newColor.image
                              ? "Image Uploaded"
                              : "Upload Variant Image"}
                          </span>
                        </label>
                      </div>
                      {newColor.image && (
                        <div className="w-10 h-10 rounded bg-black/50 overflow-hidden border border-white/20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={newColor.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <Button
                        type="button"
                        onClick={addColor}
                        disabled={!newColor.name || !newColor.image}
                        className="whitespace-nowrap"
                      >
                        Add Variant
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#151515] p-6 rounded-2xl border border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-white">
                    Technical Specifications
                  </h3>
                  {!isAddingSpec && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAddingSpec(true)}
                    >
                      <Plus size={14} /> Add Spec
                    </Button>
                  )}
                </div>

                {isAddingSpec && (
                  <div className="flex gap-2 mb-4 animate-in fade-in slide-in-from-top-2">
                    <input
                      autoFocus
                      placeholder="Spec Name (e.g. Warranty)"
                      value={newSpecName}
                      onChange={(e) => setNewSpecName(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddSpec())
                      }
                      className="flex-1 bg-black/40 border border-bronze-500/50 rounded-lg p-3 text-white text-sm focus:border-bronze-500 outline-none"
                    />
                    <Button type="button" size="sm" onClick={handleAddSpec}>
                      Add
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAddingSpec(false)}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData.specs || {}).map(([key, val]) => (
                    <div key={key} className="flex gap-2 group">
                      <div className="w-1/3 bg-white/5 p-3 rounded-lg text-xs font-bold text-white/60 flex items-center justify-center text-center">
                        {key}
                      </div>
                      <input
                        value={val}
                        onChange={(e) => handleSpecChange(key, e.target.value)}
                        className="flex-1 bg-black/40 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-bronze-500 outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpec(key)}
                        className="text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                {Object.keys(formData.specs || {}).length === 0 && (
                  <div className="text-white/20 text-center py-6 border border-dashed border-white/10 rounded-xl">
                    No specifications added. Click + to add technical details.
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Column: Media & Extras */}
        <div className="space-y-6">
          <div className="bg-[#151515] p-6 rounded-2xl border border-white/5 space-y-4">
            <h3 className="text-lg font-bold text-white mb-4">Media Gallery</h3>

            {/* Image Upload Zone */}
            <ImageUploadZone
              onUpload={(file) => handleUpload(file, "gallery")}
            />

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {formData.gallery.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden group border border-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(i)}
                    className="absolute top-1 right-1 bg-black/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features (Machines Only) */}
          {formData.category === "machines" && (
            <div className="bg-[#151515] p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white">Key Features</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase">
                  Feature List (Comma separated)
                </label>
                <textarea
                  value={formData.features?.join(", ")}
                  onChange={(e) => handleArrayChange(e, "features")}
                  rows="4"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-bronze-500 outline-none transition-all"
                  placeholder="Dual Boiler, PID Control, ..."
                />
              </div>
            </div>
          )}

          {/* Beans Specific */}
          {formData.category === "beans" && (
            <div className="bg-[#151515] p-6 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-lg font-bold text-white">Bean Profile</h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase">
                  Roast Level
                </label>
                <select
                  name="roast"
                  value={formData.roast}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:border-bronze-500 outline-none"
                >
                  <option value="">Select Roast</option>
                  <option value="Light Roast">Light Roast</option>
                  <option value="Medium Roast">Medium Roast</option>
                  <option value="Dark Roast">Dark Roast</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase">
                  Tasting Notes
                </label>
                <input
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-bronze-500 outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function ImageUploadZone({ onUpload }) {
  const fileInputRef = React.useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${dragging ? "border-bronze-500 bg-bronze-500/10" : "border-white/10 hover:border-white/20 hover:bg-white/5"}`}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className="bg-white/10 p-3 rounded-full mb-3 text-white">
        <Plus size={24} />
      </div>
      <p className="text-sm font-bold text-white">Click or Drag Image</p>
      <p className="text-xs text-white/40 mt-1">Upload JPG, PNG (Max 5MB)</p>
    </div>
  );
}
