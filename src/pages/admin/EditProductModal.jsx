import React, { useEffect, useState } from "react";
import DynamicTextField from "./../../components/sharedComponents/DynamicTextField";
import TextArea from "./../../components/sharedComponents/TextArea";
import Dropdown from "./../../components/sharedComponents/Dropdown";
import { updateProduct, fetchAllProducts, createProduct } from "./../../redux/slices/adminProductSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const EditProductModal = ({ product, onClose }) => {
  console.log("product details :", product);
  const isEditing = !!product;
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    category: product?.category_id?._id || "",
    subCategory: product?.subcategory_id?._id || "",
    purposeFor: product?.purposeFor_id?._id || "",
    bedSize_id: product?.bedSize_id?._id,
    seatingSize_id: product?.seatingSize_id?._id,
    doorCout_id:product?.doorCout_id?._id,
    price: product?.price || "",
    stock: product?.stock || "",
    features: product?.specifications?.features || "",
    general: product?.specifications?.general || "",
    assemblyProvided: product?.specifications?.assembly_provided ? "yes" : "no",
    dimensions: product?.specifications?.dimensions || "",
    material: product?.specifications?.material || "",
    weight: product?.specifications?.weight || "",
    color: product?.specifications?.color || "",
    images: Array.isArray(product?.images) ? product?.images : [], // Stores image URL
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [purposeFor, setPurposeFor] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingSubCategories, setLoadingSubCategories] = useState(true);
  const [loadingPurposeFor, setLoadingPurposeFor] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch("https://homecraft-backend.onrender.com/api/lookup/fetch-categories");
        const data = await response.json();
        if (data && data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    const fetchPurposeFor = async () => {
      setLoadingPurposeFor(true);
      try {
        const response = await fetch("https://homecraft-backend.onrender.com/api/lookup/fetch-purposeFor");
        const data = await response.json();
        if (data && data.purpose_for) {
          setPurposeFor(data.purpose_for);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingPurposeFor(false);
      }
    };
    fetchCategories();
    fetchPurposeFor();
  }, []);

  useEffect(() => {
    if (formData.category) {
      const fetchSubCategories = async () => {
        setLoadingSubCategories(true);
        try {
          const response = await fetch(`https://homecraft-backend.onrender.com/api/lookup/fetch-subCategories/${formData.category}`);
          const data = await response.json();
          if (data && data.subcategories) {
            setSubCategories(data.subcategories);
          }
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        } finally {
          setLoadingSubCategories(false);
        }
      };
      fetchSubCategories();
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Upload Image to Cloudinary API
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
    ///formData.append("upload_preset", "your_cloudinary_preset"); // Adjust this
  
    try {
      const response = await fetch("https://homecraft-backend.onrender.com/api/upload-image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("image uplaod response : ", data);
      if (data.imageUrl) {
        setFormData((prev) => {
          const updatedForm = {
            ...prev,
            images: [...prev.images, { url: data.imageUrl }],
          };
          console.log("Updated formData with images:", updatedForm);
          return updatedForm;
        });
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updates = {
        ...formData,
        category_id: formData.category,
        subcategory_id: formData.subCategory,
        purposeFor_id: formData.purposeFor,
      };
      if (isEditing) {
        // Update existing product
        await dispatch(updateProduct({ id: product._id, updates: updates })).unwrap();
        toast.success("Product updated successfully!");
      } else {
        // Create a new product
        console.log("Final payload before submitting:", updates);
        await dispatch(createProduct(updates)).unwrap();
        toast.success("Product added successfully!");
      }
      await dispatch(fetchAllProducts({ page: 1, limit: 10 }));
      onClose();
      // await dispatch(fetchAllProducts({ page: 1, limit: 10 }));
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(`Failed to ${isEditing ? "update" : "add"} product`);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-lg font-bold mb-4 text-center">Edit Product</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DynamicTextField label="Product Name" name="name" value={formData.name} onChange={handleChange} />
          <TextArea label="Product Description" name="description" value={formData.description} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-4">
            <Dropdown label="Category" name="category" value={formData.category} onChange={handleChange} options={categories} loading={loadingCategories} />
            <Dropdown label="Sub Category" name="subCategory" value={formData.subCategory} onChange={handleChange} options={subCategories} loading={loadingSubCategories} />
            <Dropdown label="Purpose For" name="purposeFor" value={formData.purposeFor} onChange={handleChange} options={purposeFor} loading={loadingPurposeFor} />
          </div>
          <DynamicTextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} />
          <DynamicTextField label="Stock" name="stock" type="number" value={formData.stock} onChange={handleChange} />
          <h3 className="text-md font-bold mt-4 border-b pb-2">Specifications</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Assembly Provided</label>
            <div className="flex items-center mt-1">
              <label className="inline-flex items-center mr-4">
                <input type="radio" name="assemblyProvided" value="yes" checked={formData.assemblyProvided === "yes"} onChange={handleChange} className="form-radio" />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="assemblyProvided" value="no" checked={formData.assemblyProvided === "no"} onChange={handleChange} className="form-radio" />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          <TextArea label="Product Feature" name="features" value={formData.features} onChange={handleChange} />
          <DynamicTextField label="Dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange} />
          <DynamicTextField label="Material" name="material" value={formData.material} onChange={handleChange} />
          <DynamicTextField label="Color" name="color" value={formData.color} onChange={handleChange} />

          {/* Image Upload Section */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
            <button type="button" onClick={handleImageUpload} className="btn btn-sm btn-primary mt-2" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div> */}
          <div className="mt-4">
  <h3 className="text-md font-bold mb-2">Product Images</h3>
  <div className="flex flex-wrap gap-2">
    {formData.images.map((img, index) => (
      <div key={index} className="relative">
        <img src={img.url} alt={`Product ${index}`} className="w-20 h-20 object-cover rounded" />
        <button
          type="button"
          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
          onClick={() => handleRemoveImage(index)}
        >
          ✕
        </button>
      </div>
    ))}
  </div>
  <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />
</div>


          <div className="modal-action flex justify-end">
            <button type="submit" className="btn btn-sm btn-success">{isEditing ? "Save" : "Add"}</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
