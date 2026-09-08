import Alert from "../../Components/Common/Alert.jsx";
import Loading from "../../Components/Common/Loading.jsx";
import { useEffect, useState } from "react";
import api from "../../api/api.js";

// MUI Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

// MUI Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InventoryIcon from "@mui/icons-material/Inventory";
import VisibilityIcon from "@mui/icons-material/Visibility";

const BASE_URL = "http://localhost:5000";

function Products() {
  // States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form states
  const [productForm, setProductForm] = useState({
    title: "",
    price: "",
    stock: "",
    category: "",
    subcategory: "",
    description: "",
  });

  // Image & Thumbnail states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  // Gallery (multiple images) states
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  // Details modal slider state
  const [slideIndex, setSlideIndex] = useState(0);

  // Fetch Products
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
      setError(null);
    } catch (err) {
      console.log("خطا در دریافت محصولات:", err);
      setError("خطا در دریافت لیست محصولات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      await getProducts();
    };
    loadProducts();
  }, []);

  // Fetch Categories from Backend
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.log("خطا در دریافت دسته‌بندی‌ها:", err);
      }
    };
    getCategories();
  }, []);

  // Filter for search products
  const filter = products.filter((product) =>
    (product.title || product.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  // Handle Image File Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle Thumbnail File Selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Handle Gallery (Multiple Images) Selection
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryFiles((prev) => [...prev, ...files]);
      setGalleryPreviews((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  // Remove a gallery image by index
  const removeGalleryImage = (index) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Reset Form and Modal
  const resetForm = () => {
    setProductForm({
      title: "",
      stock: "",
      price: "",
      category: "",
      subcategory: "",
      description: "",
    });
    setImageFile(null);
    setImagePreview(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setSelectedProduct(null);
  };

  // Open Edit Modal
  const openEditModal = (product) => {
    setSelectedProduct(product);

    const catId =
      typeof product.category === "object"
        ? product.category?._id || product.category?.id
        : product.category || product.categoryId;

    const subCatId =
      typeof product.subcategory === "object"
        ? product.subcategory?._id || product.subcategory?.id
        : product.subcategory || product.subcategoryId;

    setProductForm({
      title: product.title || product.name || "",
      stock: product.stock !== undefined ? String(product.stock) : "",
      price: product.price !== undefined ? String(product.price) : "",
      category: catId || "",
      subcategory: subCatId || "",
      description: product.description || "",
    });

    const imgPath = product.imageUrl || product.image;
    if (imgPath) {
      setImagePreview(
        imgPath.startsWith("http")
          ? imgPath
          : `${BASE_URL}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`,
      );
    } else {
      setImagePreview(null);
    }

    const thumbPath = product.thumbnailUrl || product.thumbnail;
    if (thumbPath) {
      setThumbnailPreview(
        thumbPath.startsWith("http")
          ? thumbPath
          : `${BASE_URL}${thumbPath.startsWith("/") ? "" : "/"}${thumbPath}`,
      );
    } else {
      setThumbnailPreview(null);
    }

    setIsEditModalOpen(true);
  };

  // Open Delete Modal
  const openDeletModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  // Open Details Modal
  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setSlideIndex(0);
    setIsDetailsModalOpen(true);
  };

  // Resolve image / thumbnail full URL for a product
  const resolveImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http")
      ? path
      : `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  // Extract category / subcategory titles from a product
  const getCategoryTitle = (cat) => {
    if (typeof cat === "object") return cat?.title || cat?.name;
    const found = categories.find((c) => (c._id || c.id) === cat);
    return found?.title || found?.name || cat;
  };

  const getSubcategoryTitle = (sub) => {
    if (typeof sub === "object") return sub?.title || sub?.name;
    // Search subcategories across ALL categories, not just the form's selection
    for (const cat of categories) {
      const subs = cat?.subcategories || cat?.children || [];
      const found = subs.find((s) => (s._id || s.id) === sub);
      if (found) return found?.title || found?.name || sub;
    }
    return sub;
  };

  // Add New Product (FormData)
  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !productForm.title.trim() ||
      productForm.price === "" ||
      !productForm.category ||
      !productForm.subcategory
    ) {
      alert("لطفاً همه فیلدهای ضروری را پر یا انتخاب کنید.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", productForm.title.trim());
      formData.append("price", productForm.price);
      formData.append("stock", productForm.stock || "0");
      formData.append("category", productForm.category);
      formData.append("subcategory", productForm.subcategory);
      formData.append("description", productForm.description);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      galleryFiles.forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProducts((prev) => [...prev, res.data]);
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("خطا در افزودن محصول:", err.response?.data || err);
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "خطای 500 از سمت سرور برپاشده است. تب Response در Network را بررسی کنید.",
      );
    }
  };

  // Edit Product (FormData)
  const editProduct = async (e) => {
    e.preventDefault();

    const productId = selectedProduct?._id || selectedProduct?.id;
    if (!productId) return;

    if (
      !productForm.title.trim() ||
      productForm.price === "" ||
      !productForm.category ||
      !productForm.subcategory
    ) {
      alert("لطفاً همه فیلدهای ضروری را پر کنید.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", productForm.title.trim());
      formData.append("price", productForm.price);
      formData.append("stock", productForm.stock || "0");
      formData.append("category", productForm.category);
      formData.append("subcategory", productForm.subcategory);
      formData.append("description", productForm.description);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      galleryFiles.forEach((file) => {
        formData.append("images", file);
      });

      const res = await api.put(`/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProducts((prev) =>
        prev.map((item) =>
          (item._id || item.id) === productId ? res.data : item,
        ),
      );

      setIsEditModalOpen(false);
      resetForm();
    } catch (err) {
      console.error("خطا در ویرایش محصول:", err.response?.data || err);
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "خطا در ویرایش محصول",
      );
    }
  };

  // Delete Product
  const handleDeleteProduct = async () => {
    const productId = selectedProduct?._id || selectedProduct?.id;
    if (!productId) return;

    try {
      await api.delete(`/products/${productId}`);
      setProducts((prev) =>
        prev.filter((product) => (product._id || product.id) !== productId),
      );
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error("error in delete product:", err);
      alert(err.response?.data?.message || "خطا در حذف محصول");
    }
  };

  // Subcategory Helper
  const currentCategoryObj = categories.find(
    (cat) => (cat._id || cat.id) === productForm.category,
  );

  const subcategoriesList =
    currentCategoryObj?.subcategories || currentCategoryObj?.children || [];

  return (
    <div className="space-y-6 dir-rtl text-neutral-800 dark:text-neutral-100 transition-colors duration-200">
      {error && <Alert type="error" message={error} />}
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            مدیریت محصولات
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            لیست تمام محصولات و مدیریت موجودی
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 px-4 py-2.5 text-sm font-semibold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>+</span> افزودن محصول جدید
        </button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <input
          type="text"
          placeholder="جستجوی نام محصول..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700/70 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 text-sm outline-none transition focus:border-neutral-400 dark:focus:border-neutral-500"
        />
      </div>

      {/* Products table */}
      <TableContainer
        component={Paper}
        elevation={0}
        className="!bg-white dark:!bg-neutral-800/80 !border !border-neutral-200 dark:!border-neutral-700/70 !rounded-2xl !shadow-sm overflow-hidden"
      >
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead className="bg-neutral-50 dark:bg-neutral-900/60">
            <TableRow>
              <TableCell
                align="right"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
              >
                تصویر
              </TableCell>
              <TableCell
                align="right"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
              >
                عنوان محصول
              </TableCell>
              <TableCell
                align="right"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
              >
                دسته‌بندی
              </TableCell>
              <TableCell
                align="right"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
              >
                قیمت (تومان)
              </TableCell>
              <TableCell
                align="right"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
              >
                موجودی
              </TableCell>
              <TableCell
                align="center"
                className="!font-bold !text-neutral-700 dark:!text-neutral-300 !border-b !border-neutral-200 dark:!border-neutral-700/70"
              >
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" className="!py-12">
                  <Loading />
                </TableCell>
              </TableRow>
            ) : filter.length > 0 ? (
              filter.map((product) => {
                const isOutOfStock = Number(product.stock) <= 0;
                const categoryTitle =
                  typeof product.category === "object"
                    ? product.category?.title || product.category?.name
                    : product.category;

                // In the table we show the thumbnail (fallback to main image)
                const tableImgUrl =
                  product.thumbnailUrl || product.thumbnail || product.imageUrl || product.image;
                const formattedImgSrc = tableImgUrl
                  ? tableImgUrl.startsWith("http")
                    ? tableImgUrl
                    : `${BASE_URL}${tableImgUrl.startsWith("/") ? "" : "/"}${tableImgUrl}`
                  : null;

                return (
                  <TableRow
                    key={product._id || product.id}
                    onClick={() => openDetailsModal(product)}
                    className="hover:bg-neutral-50/80 dark:hover:bg-neutral-700/30 transition-colors cursor-pointer"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      align="right"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                        {formattedImgSrc ? (
                          <img
                            src={formattedImgSrc}
                            alt={product.title || product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-neutral-400">
                            بدون عکس
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell
                      align="right"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 text-sm">
                        {product.title || product.name || "بدون عنوان"}
                      </span>
                    </TableCell>

                    <TableCell
                      align="right"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                        {categoryTitle || "عمومی"}
                      </span>
                    </TableCell>

                    <TableCell
                      align="right"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <span className="font-mono text-neutral-800 dark:text-neutral-200 text-sm font-semibold">
                        {Number(product.price || 0).toLocaleString("fa-IR")}
                      </span>
                    </TableCell>

                    <TableCell
                      align="right"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${
                          isOutOfStock
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {isOutOfStock ? "اتمام موجودی" : `${product.stock} عدد`}
                      </span>
                    </TableCell>

                    <TableCell
                      align="center"
                      className="!border-b !border-neutral-100 dark:!border-neutral-700/50"
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Tooltip title="مشاهده جزئیات">
                          <IconButton
                            size="small"
                            className="!text-neutral-500 hover:!text-neutral-900 dark:!text-neutral-400 dark:hover:!text-neutral-100 hover:!bg-neutral-100 dark:hover:!bg-neutral-700/60"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDetailsModal(product);
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="ویرایش محصول">
                          <IconButton
                            size="small"
                            className="!text-neutral-500 hover:!text-neutral-900 dark:!text-neutral-400 dark:hover:!text-neutral-100 hover:!bg-neutral-100 dark:hover:!bg-neutral-700/60"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(product);
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="حذف">
                          <IconButton
                            size="small"
                            className="!text-rose-500 hover:!text-rose-700 dark:!text-rose-400 dark:hover:!text-rose-300 hover:!bg-rose-500/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeletModal(product);
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  className="!py-12 !border-0 text-center"
                >
                  <InventoryIcon className="!text-5xl !text-neutral-300 dark:!text-neutral-600 !mb-2" />
                  <p className="text-neutral-400 dark:text-neutral-500 text-sm">
                    محصولی یافت نشد.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Product form modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-neutral-200 dark:border-neutral-700 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-neutral-700">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {isAddModalOpen ? "افزودن محصول جدید" : "ویرایش محصول"}
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                  resetForm();
                }}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={isAddModalOpen ? addProduct : editProduct}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  عنوان محصول
                </label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) =>
                    setProductForm({ ...productForm, title: e.target.value })
                  }
                  placeholder="مثلاً: گوشی موبایل سامسونگ"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm outline-none focus:border-neutral-500"
                />
              </div>

              {/* Category fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                    دسته‌بندی اصلی
                  </label>
                  <select
                    required
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                        subcategory: "",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm outline-none focus:border-neutral-500"
                  >
                    <option value="">انتخاب دسته‌بندی...</option>
                    {categories.map((cat) => (
                      <option key={cat._id || cat.id} value={cat._id || cat.id}>
                        {cat.title || cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                    زیردسته‌بندی
                  </label>
                  <select
                    required
                    value={productForm.subcategory}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        subcategory: e.target.value,
                      })
                    }
                    disabled={
                      !productForm.category || subcategoriesList.length === 0
                    }
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm outline-none focus:border-neutral-500 disabled:opacity-50"
                  >
                    <option value="">انتخاب زیردسته‌بندی...</option>
                    {subcategoriesList.map((sub) => (
                      <option key={sub._id || sub.id} value={sub._id || sub.id}>
                        {sub.title || sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                    قیمت (تومان)
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm outline-none focus:border-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                    موجودی
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              {/* Product image */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  عکس محصول
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-xs text-neutral-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-200 hover:file:bg-neutral-200 cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shrink-0">
                      <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  تامنیل (Thumbnail)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="text-xs text-neutral-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-200 hover:file:bg-neutral-200 cursor-pointer"
                  />
                  {thumbnailPreview && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 shrink-0">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Image gallery */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  گالری تصاویر (می‌توانید چند عکس انتخاب کنید)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="text-xs text-neutral-500 file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-200 hover:file:bg-neutral-200 cursor-pointer w-full"
                />
                {galleryPreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {galleryPreviews.map((preview, index) => (
                      <div
                        key={index}
                        className="relative w-16 h-16 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 group"
                      >
                        <img
                          src={preview}
                          alt={`gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute inset-0 bg-black/60 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        >
                          حذف
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold mb-1 text-neutral-700 dark:text-neutral-300">
                  توضیحات
                </label>
                <textarea
                  rows={4}
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      description: e.target.value,
                    })
                  }
                  placeholder="توضیحات محصول را وارد کنید..."
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm outline-none focus:border-neutral-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-semibold transition cursor-pointer"
                >
                  {isAddModalOpen ? "ثبت محصول" : "ذخیره تغییرات"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product details modal */}
      {isDetailsModalOpen && selectedProduct && (() => {
        const imgUrl = resolveImageUrl(
          selectedProduct.imageUrl || selectedProduct.image,
        );

        // Extract gallery images (supports different backend field names)
        const rawGallery =
          selectedProduct.images ||
          selectedProduct.imageUrls ||
          selectedProduct.gallery ||
          [];
        const galleryUrls = (Array.isArray(rawGallery)
          ? rawGallery
          : [rawGallery]
        )
          .map((item) =>
            resolveImageUrl(
              typeof item === "object"
                ? item.url || item.imageUrl || item.path
                : item,
            ),
          )
          .filter(Boolean);

        const isOutOfStock = Number(selectedProduct.stock) <= 0;
        const description =
          selectedProduct.description || "توضیحی برای این محصول ثبت نشده است.";

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setIsDetailsModalOpen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-neutral-800 rounded-2xl max-w-lg w-full shadow-2xl border border-neutral-200 dark:border-neutral-700 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="flex justify-between items-center p-6 pb-3 border-b border-neutral-100 dark:border-neutral-700">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  جزئیات محصول
                </h2>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 text-xl font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Image slider */}
                {(() => {
                  const slides = [imgUrl, ...galleryUrls].filter(Boolean);

                  return (
                    <div>
                      <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                        تصاویر محصول
                        {slides.length > 1 && ` (${slides.length} عکس)`}
                      </span>
                      <div
                        dir="ltr"
                        className="relative mt-1.5 w-full h-80 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700"
                      >
                        {slides.length > 0 ? (
                          <>
                            {/* Slides */}
                            <div
                              className="flex h-full transition-transform duration-300 ease-out"
                              style={{
                                transform: `translateX(-${slideIndex * 100}%)`,
                              }}
                            >
                              {slides.map((url, index) => (
                                <img
                                  key={index}
                                  src={url}
                                  alt={`slide ${index + 1}`}
                                  className="w-full h-full object-contain shrink-0 p-2"
                                />
                              ))}
                            </div>

                            {/* Previous */}
                            {slides.length > 1 && (
                              <button
                                onClick={() =>
                                  setSlideIndex((prev) =>
                                    prev === 0
                                      ? slides.length - 1
                                      : prev - 1,
                                  )
                                }
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition cursor-pointer"
                              >
                                ‹
                              </button>
                            )}

                            {/* Next */}
                            {slides.length > 1 && (
                              <button
                                onClick={() =>
                                  setSlideIndex((prev) =>
                                    prev === slides.length - 1 ? 0 : prev + 1,
                                  )
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition cursor-pointer"
                              >
                                ›
                              </button>
                            )}

                            {/* Navigation dots */}
                            {slides.length > 1 && (
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                                {slides.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setSlideIndex(index)}
                                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                      index === slideIndex
                                        ? "w-5 bg-white"
                                        : "w-1.5 bg-white/50 hover:bg-white/80"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}

                            {/* Slide counter */}
                            {slides.length > 1 && (
                              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/50 text-white text-[10px] font-semibold">
                                {slideIndex + 1} / {slides.length}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-xs text-neutral-400">
                            بدون عکس
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Title */}
                <div>
                  <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    عنوان محصول
                  </span>
                  <p className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
                    {selectedProduct.title || selectedProduct.name || "بدون عنوان"}
                  </p>
                </div>

                {/* Category and price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      دسته‌بندی
                    </span>
                    <p className="text-sm text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {getCategoryTitle(selectedProduct.category) || "عمومی"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      زیردسته‌بندی
                    </span>
                    <p className="text-sm text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {getSubcategoryTitle(
                        selectedProduct.subcategory ||
                          selectedProduct.subcategoryId,
                      ) || "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      قیمت
                    </span>
                    <p className="text-sm font-semibold font-mono text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {Number(selectedProduct.price || 0).toLocaleString("fa-IR")}{" "}
                      تومان
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                      موجودی
                    </span>
                    <p className="mt-0.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${
                          isOutOfStock
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        }`}
                      >
                        {isOutOfStock
                          ? "اتمام موجودی"
                          : `${selectedProduct.stock} عدد`}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    توضیحات
                  </span>
                  <p className="text-sm text-neutral-800 dark:text-neutral-200 mt-1 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 p-6 pt-2 border-t border-neutral-100 dark:border-neutral-700">
                <button
                  onClick={() => {
                    setIsDetailsModalOpen(false);
                    openEditModal(selectedProduct);
                  }}
                  className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition cursor-pointer"
                >
                  ویرایش محصول
                </button>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-semibold transition cursor-pointer"
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Delete confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200 dark:border-neutral-700 space-y-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              حذف محصول
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              آیا از حذف محصول «
              <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                {selectedProduct?.title || selectedProduct?.name}
              </span>
              » اطمینان دارید؟ این عملیات قابل بازگشت نیست.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-xs font-semibold transition cursor-pointer"
              >
                انصراف
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                حذف محصول
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
