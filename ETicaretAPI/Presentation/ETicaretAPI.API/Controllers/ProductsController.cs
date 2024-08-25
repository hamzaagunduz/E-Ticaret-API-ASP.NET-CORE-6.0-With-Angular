using ETicaretAPI.Application.Abstractions;
using ETicaretAPI.Application.Abstractions.Storage;
using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Application.RequestParameters;
using ETicaretAPI.Application.ViewModel.Product;
using ETicaretAPI.Domain.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductWriteRepositories _productWriteRepositories;
        private readonly IProductReadRepositories _productReadRepositories;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IProductImageFileWriteRepository _productImageFileWriteRepository;
        private readonly IStorageService _storageService;
        private readonly IConfiguration _configuraiton;


        public ProductsController(IProductWriteRepositories productWriteRepositories, IProductReadRepositories productReadRepositories, IWebHostEnvironment _webHostEnvironment, IProductImageFileWriteRepository productImageFileWriteRepository, IStorageService storageService, IConfiguration configuraiton)
        {
            _productWriteRepositories = productWriteRepositories;
            _productReadRepositories = productReadRepositories;
            this._webHostEnvironment = _webHostEnvironment;
            _productImageFileWriteRepository = productImageFileWriteRepository;
            _storageService = storageService;
            _configuraiton = configuraiton;
        }

        [HttpGet]
        public IActionResult GetProducts([FromQuery]Pagination pagination)
        {

            var totalCount= _productReadRepositories.GetAll(false).Count();
            var products= _productReadRepositories.GetAll(false).Skip(pagination.Size * pagination.Page).Take(pagination.Size).Select(p => new
            {
                p.Id,
                p.Name,
                p.Price,
                p.Stock,
                p.CreatedTime,
                p.UpdateTime
            });

            return Ok(new { 
                totalCount,
                 products
                 });
        }
        [HttpPost]
        public async Task <IActionResult> AddProduct(VM_Create_Product model)
        {
           await _productWriteRepositories.AddAsync(new()
            {
                Name=model.name,
                Price=model.price,
                Stock=model.stock,

            });
            await _productWriteRepositories.SaveAsync();
            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpPut]
        public async Task<IActionResult> Put(VM_Update_Product model)
        {
            Product product = await _productReadRepositories.GetByIdAsync(model.id);
            product.Stock = model.stock;
            product.Price = model.price;
            product.Name = model.name;
            _productWriteRepositories.SaveAsync();
            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _productWriteRepositories.RemoveAsync(id);
            await _productWriteRepositories.SaveAsync();

            return Ok();
        }

        [HttpPost("[Action]")]
        public async Task<IActionResult> Upload(string id)
        {


            List<(string fileName, string pathOrContainerName)> result = await _storageService.UploadAsync("product-photo", Request.Form.Files);

            Product product =await _productReadRepositories.GetByIdAsync(id);

            await _productImageFileWriteRepository.AddRangeAsync(result.Select(d => new ProductImageFile()
            {
                FileName = d.fileName,
                Path = d.pathOrContainerName,
                Storage = _storageService.StorageName,
                Products = new List<Product>() { product }

            }).ToList()) ;

           await _productImageFileWriteRepository.SaveAsync();
            return Ok();

        }
        [HttpGet("[Action]/{id}")]

        public async Task<IActionResult> GetProductImages(string id)
        {
          Product? product=await  _productReadRepositories.Table.Include(p => p.ProductImageFiles).
                FirstOrDefaultAsync(p => p.Id == Guid.Parse(id));

            return Ok(product.ProductImageFiles.Select(p=> new
            {
                Path= $"{_configuraiton["BaseStorageUrl"]}{p.Path}",
                p.FileName,
                p.Id
            }));
        }
        [HttpDelete("[Action]/{id}")]

        public async Task<IActionResult> DeleteImages(string id,string imageId)
        {
            Product? product = await _productReadRepositories.Table.Include(p => p.ProductImageFiles).
                  FirstOrDefaultAsync(p => p.Id == Guid.Parse(id));

           ProductImageFile productImageFile=  product.ProductImageFiles.FirstOrDefault(p => p.Id == Guid.Parse(imageId));

            product.ProductImageFiles.Remove(productImageFile);
           await _productWriteRepositories.SaveAsync();
            return Ok();

        }

    }
}
