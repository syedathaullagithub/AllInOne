using AllRestAPIs.Data;
using AllRestAPIs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AllRestAPIs.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        //Hardcoded value without DB changes, for testing purpose only

        //static private List<Book> books = new List<Book>
        //{
        //    new Book
        //    {
        //        Id = 1,
        //        Title = "The Great Gatsby",
        //        Author = "F. Scott Fitzgerald",
        //        YearPublished = 1925
        //    },
        //    new Book
        //    {
        //        Id = 2,
        //        Title = "To Kill a Mockingbird",
        //        Author = "Harper Lee",
        //        YearPublished = 1960
        //    },
        //    new Book
        //    {
        //        Id = 3,
        //        Title = "1984",
        //        Author = "George Orwell",
        //        YearPublished = 1949
        //    },
        //     new Book
        //    {
        //        Id = 4,
        //        Title = "1984",
        //        Author = "George Orwell",
        //        YearPublished = 1949
        //    }
        //};

        //[HttpGet]
        //public ActionResult<List<Book>> GetBooks()
        //{
        //    return Ok(books);
        //}

        //[HttpGet("{id}")]
        //public ActionResult<List<Book>> GetBookById(int id)
        //{
        //    var book = books.FirstOrDefault(x => x.Id == id);
        //        if(book == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(book);
        //}

        //[HttpPost]
        //public ActionResult AddBook(Book newBook)
        //{
        //    if(newBook == null)
        //    {
        //        return NotFound();
        //    }

        //    books.Add(newBook);
        //    return Ok("Book is created");
        //}

        //[HttpPut("{Id}")]
        //public ActionResult UpdateBook(int id, Book UpdatedBook)
        //{
        //    var book = books.FirstOrDefault(x => x.Id == id);
        //    if (book == null)
        //    {
        //        return NotFound();
        //    }
        //    book.Id = UpdatedBook.Id;
        //    book.Author = UpdatedBook.Author;
        //    book.Title = UpdatedBook.Title;
        //    book.YearPublished = UpdatedBook.YearPublished;
        //    return Ok("Book is Updated");

        //}

        //[HttpDelete("{Id}")]
        //public ActionResult DeleteBook(int id)
        //{
        //    var book = books.FirstOrDefault(x => x.Id == id);
        //    if (book == null)
        //    {
        //        return NotFound();
        //    }
        //    books.Remove(book);

        //    return Ok($"Book {book.Title} is deleted");
        //}




        //Database context for accessing the database
        private readonly ApiContext _context;
        public BooksController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            return Ok(await _context.Books.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Book>>> GetBookById(int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult> AddBook(Book newBook)
        {
            if (newBook == null)
            {
                return BadRequest();
            }

            _context.Books.Add(newBook);
            await _context.SaveChangesAsync();
            return Ok("Book is created");
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> UpdateBook(int id, Book UpdatedBook)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (book == null)
            {
                 return BadRequest();
            }
            book.Id = UpdatedBook.Id;
            book.Author = UpdatedBook.Author;
            book.Title = UpdatedBook.Title;
            book.YearPublished = UpdatedBook.YearPublished;

            await _context.SaveChangesAsync();
            return Ok("Book is Updated");
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteBook(int id)
        {
            var book = _context.Books.FirstOrDefault(x => x.Id == id);
            if (book == null)
            {
                return NotFound();
            }
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return Ok($"Book {book.Title} is deleted");
        }

        // GET: api/books/search?query=harry
        [HttpGet("search")]
        public async Task<IActionResult> SearchBooks([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Search query cannot be empty.");

            var results = await _context.Books.Where(b => b.Title.Contains(query)|| b.Author.Contains(query)).ToListAsync();

            return Ok(results);
        }

        //Pagination
        [HttpGet("paged")]
        public async Task<IActionResult> GetBooksPaged(int pageNumber = 1, int pageSize = 10)
        {
            if (pageNumber <= 0 || pageSize <= 0)
                return BadRequest("Page number and size must be greater than zero.");

            var totalItems = await _context.Books.CountAsync();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var items = await _context.Books
                .OrderBy(b => b.Id) // optional: ensure consistent ordering
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var response = new
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = totalItems,
                TotalPages = totalPages,
                Items = items
            };

            return Ok(response);
        }

    }
}
