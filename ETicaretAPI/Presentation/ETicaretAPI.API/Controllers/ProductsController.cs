using ETicaretAPI.Application.Abstractions;
using ETicaretAPI.Application.Abstractions.Storage;
using ETicaretAPI.Application.Features.Commands.Product.CreateProduct;
using ETicaretAPI.Application.Features.Commands.Product.RemoveProduct;
using ETicaretAPI.Application.Features.Commands.Product.UpdateProduct;
using ETicaretAPI.Application.Features.Commands.ProductImageFile.RemoveProductImage;
using ETicaretAPI.Application.Features.Commands.ProductImageFile.UploadProductImage;
using ETicaretAPI.Application.Features.Queries.Product.GetAllProduct;
using ETicaretAPI.Application.Features.Queries.ProductImageFile.GetProductImages;
using ETicaretAPI.Application.IRepositories;
using ETicaretAPI.Application.RequestParameters;
using ETicaretAPI.Application.ViewModel.Product;
using ETicaretAPI.Domain.Entites;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = "Admin")]

    public class ProductsController : ControllerBase
    {
        private readonly IProductWriteRepositories _productWriteRepositories;
        private readonly IProductReadRepositories _productReadRepositories;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IProductImageFileWriteRepository _productImageFileWriteRepository;
        private readonly IStorageService _storageService;
        private readonly IConfiguration _configuraiton;
        private readonly IMediator _mediator;



        public ProductsController(IProductWriteRepositories productWriteRepositories, IProductReadRepositories productReadRepositories, IWebHostEnvironment _webHostEnvironment, IProductImageFileWriteRepository productImageFileWriteRepository, IStorageService storageService, IConfiguration configuraiton, IMediator mediator)
        {
            _productWriteRepositories = productWriteRepositories;
            _productReadRepositories = productReadRepositories;
            this._webHostEnvironment = _webHostEnvironment;
            _productImageFileWriteRepository = productImageFileWriteRepository;
            _storageService = storageService;
            _configuraiton = configuraiton;
            this._mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] GetAllProductQueryRequest getAllProductQueryRequest)
        {
            GetAllProductQueryResponse response = await _mediator.Send(getAllProductQueryRequest);
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(CreateProductCommandRequest createProductCommandReques)
        {
            await _mediator.Send(createProductCommandReques);
            return StatusCode((int)HttpStatusCode.Created);
        }
          [HttpPut]

        public async Task<IActionResult> Put(UpdateProductCommandRequest model)
        {
            UpdateProductCommandResponse response = await _mediator.Send(model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] RemoveProductCommandRequest removeProductCommandRequest)
        {
            RemoveProductCommandResponse response = await _mediator.Send(removeProductCommandRequest);
            return Ok();
        }


        [HttpPost("[Action]")]
        public async Task<IActionResult> Upload([FromQuery] UploadProductImageCommandRequest uploadProductImageCommandRequest)
        {
            uploadProductImageCommandRequest.Files = Request.Form.Files;
            UploadProductImageCommandResponse response = await _mediator.Send(uploadProductImageCommandRequest);
            return Ok();
        }


        [HttpGet("[Action]/{id}")]

        public async Task<IActionResult> GetProductImages([FromRoute] GetProductImagesQueryRequest getProductImagesQueryRequest)
        {
            List<GetProductImagesQueryResponse> response = await _mediator.Send(getProductImagesQueryRequest);
            return Ok(response);
        }
        [HttpDelete("[Action]/{id}")]

        public async Task<IActionResult> DeleteImages([FromRoute] RemoveProductImageCommandRequest removeProductImageCommandRequest, [FromQuery] string imageId)
        {
            removeProductImageCommandRequest.ImageId = imageId;
            RemoveProductImageCommandResponse response = await _mediator.Send(removeProductImageCommandRequest);
            return Ok();

        }

    }
}
