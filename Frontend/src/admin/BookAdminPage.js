import React, { useEffect, useState } from 'react';
import {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getAllCategories,
} from '../server/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookAdminPage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    image: null,
    category: '',
  });

  // Lấy danh sách sách
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getAllBooks();
      setBooks(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(
        err.message ||
          'Không thể tải danh sách sách. Vui lòng kiểm tra kết nối hoặc thử lại!'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files[0]) {
      const file = files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Chỉ chấp nhận file JPG, PNG, hoặc GIF');
        return;
      }
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const { title, author, price, category } = formData;
    if (!title.trim()) {
      toast.error('Tiêu đề không được để trống');
      return false;
    }
    if (!author.trim()) {
      toast.error('Tác giả không được để trống');
      return false;
    }
    if (!category.trim()) {
      toast.error('Danh mục không được để trống');
      return false;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error('Giá phải là số lớn hơn 0');
      return false;
    }
    return true;
  };

  const handleAddOrUpdateBook = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title.trim());
    formDataToSend.append('author', formData.author.trim());
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category.trim());
    formDataToSend.append('description', formData.description.trim() || '');
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      let response;
      if (isEditing && currentBook?.id) {
        formDataToSend.append('id', currentBook.id);
        response = await updateBook(null, formDataToSend);

        // Lấy book mới nhất từ backend để cập nhật hình ảnh
        if (response?.book || response?.data?.book) {
          toast.success('Cập nhật sách thành công!');
          await fetchBooks();
        } else if (response?.message) {
          toast.success(response.message);
          await fetchBooks();
        } else if (response?.error) {
          toast.error('Lỗi cập nhật: ' + response.error);
        }
      } else {
        response = await addBook(null, formDataToSend);
        if (response?.book) {
          toast.success('Thêm sách thành công!');
          await fetchBooks();
        } else if (response?.error) {
          toast.error('Lỗi thêm sách: ' + response.error);
        }
      }
      setIsFormOpen(false);
      setIsEditing(false);
      setFormData({
        title: '',
        author: '',
        price: '',
        description: '',
        image: null,
        category: '',
      });
    } catch (err) {
      toast.error('Lỗi: ' + (err.message || 'Không thể lưu sách'));
    }
  };

  const handleEditBook = (book) => {
    setIsEditing(true);
    setCurrentBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      description: book.description || '',
      image: null,
      category: book.category || '',
    });
    setIsFormOpen(true);
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sách này?')) return;
    try {
      const response = await deleteBook(null, bookId);
      if (response?.message) {
        setBooks(books.filter((book) => book.id !== bookId));
        toast.success('Xóa sách thành công!');
      } else if (response?.error) {
        toast.error('Lỗi xóa sách: ' + response.error);
      }
    } catch (err) {
      toast.error('Lỗi: ' + (err.message || 'Không thể xóa sách'));
    }
  };

  const LoadingSpinner = () => (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>Đang tải dữ liệu...</p>
      <div
        style={{
          border: '4px solid #f3f3f3',
          borderTop: '4px solid #1e90ff',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '10px auto',
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );

  const ErrorMessage = ({ message }) => (
    <div
      style={{
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        padding: '15px',
        borderRadius: '4px',
        textAlign: 'center',
        marginBottom: '20px',
      }}
    >
      {message}
      <button
        style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
        onClick={() => window.location.reload()}
      >
        Thử lại
      </button>
    </div>
  );

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <ToastContainer position="top-right" autoClose={2500} />
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Book Management</h1>
      <button
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
        onClick={() => {
          setIsFormOpen(true);
          setIsEditing(false);
          setFormData({
            title: '',
            author: '',
            price: '',
            description: '',
            image: null,
            category: '',
          });
        }}
      >
        Thêm Sách Mới
      </button>

      {isFormOpen && (
        <div
          style={{
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #ddd',
          }}
        >
          <h2 style={{ color: '#333', marginBottom: '15px' }}>
            {isEditing ? 'Chỉnh Sửa Sách' : 'Thêm Sách Mới'}
          </h2>
          <form onSubmit={handleAddOrUpdateBook}>
            <div style={{ marginBottom: '10px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderColor: '#ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderColor: '#ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0.01"
                step="0.01"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderColor: '#ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderColor: '#ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderColor: '#ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#555',
                }}
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/gif"
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderColor: '#ccc',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              {isEditing ? 'Cập Nhật' : 'Thêm'}
            </button>
            <button
              type="button"
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '10px 15px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
              onClick={() => {
                setIsFormOpen(false);
                setIsEditing(false);
                setFormData({
                  title: '',
                  author: '',
                  price: '',
                  description: '',
                  image: null,
                  category: '',
                });
              }}
            >
              Hủy
            </button>
          </form>
        </div>
      )}

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th
                style={{
                  padding: '12px',
                  borderBottom: '2px solid #ddd',
                  textAlign: 'left',
                }}
              >
                ID
              </th>
              <th
                style={{
                  padding: '12px',
                  borderBottom: '2px solid #ddd',
                  textAlign: 'left',
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: '12px',
                  borderBottom: '2px solid #ddd',
                  textAlign: 'left',
                }}
              >
                Author
              </th>
              <th
                style={{
                  padding: '12px',
                  borderBottom: '2px solid #ddd',
                  textAlign: 'left',
                }}
              >
                Price
              </th>
              <th
                style={{
                  padding: '12px',
                  borderBottom: '2px solid #ddd',
                  textAlign: 'left',
                }}
              >
                Category
              </th>
              <th
                style={{
                  padding: '12px',
                  borderBottom: '2px solid #ddd',
                  textAlign: 'left',
                }}
              >
                Image
              </th>
              <th
                style={{
                  padding: '12px',
                  borderBottom: '2px solid #ddd',
                  textAlign: 'left',
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ padding: '10px', textAlign: 'center', color: '#777' }}
                >
                  Không có sách nào.
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{book.id}</td>
                  <td style={{ padding: '10px' }}>{book.title}</td>
                  <td style={{ padding: '10px' }}>{book.author}</td>
                  <td style={{ padding: '10px' }}>{book.price}VND</td>
                  <td style={{ padding: '10px' }}>{book.category}</td>
                  <td style={{ padding: '10px' }}>
                    {book.image_url ? (
                      <img
                        src={book.image_url + '?v=' + book.id}
                        alt={book.title}
                        style={{
                          width: '64px',
                          height: '64px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button
                        style={{
                          backgroundColor: '#007bff',
                          color: 'white',
                          padding: '8px 12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                        }}
                        onClick={() => handleEditBook(book)}
                      >
                        Sửa
                      </button>
                      <button
                        style={{
                          backgroundColor: '#dc3545',
                          color: 'white',
                          padding: '8px 12px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '14px',
                        }}
                        onClick={() => handleDeleteBook(book.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookAdminPage;
