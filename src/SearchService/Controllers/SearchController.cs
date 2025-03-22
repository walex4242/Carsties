using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;
using SearchService.Models;
using SearchService.RequestHelpers;

namespace SearchService.Controllers;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Item>>> SearchItems([FromQuery] SearchParams searchParams)
    {
        var query = DB.PagedSearch<Item, Item>();

        if (!string.IsNullOrEmpty(searchParams.SearchTerm))
        {
            query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
        }

        // Apply sorting based on orderBy
        switch (searchParams.OrderBy)
        {
            case "make":
                query.Sort(x => x.Ascending(a => a.Make))
                     .Sort(x => x.Ascending(a => a.Model));
                break;

            case "new":
                query.Sort(x => x.Descending(a => a.CreatedAt));
                break;

            case "endingSoon":
                query.Sort(x => x.Ascending(a => a.AuctionEnd));
                break;
        }

        // Apply filtering based on filterBy
        switch (searchParams.FilterBy)
        {
            case "finished":
                query.Match(x => x.AuctionEnd < DateTime.UtcNow);
                break;

            case "endingSoon":
                query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6) && x.AuctionEnd > DateTime.UtcNow);
                break;

            default:
                query.Match(x => x.AuctionEnd > DateTime.UtcNow);
                break;
        }

        if (!string.IsNullOrEmpty(searchParams.Seller))
        {
            query.Match(x => x.Seller == searchParams.Seller);
        }

        if (!string.IsNullOrEmpty(searchParams.Winner))
        {
            query.Match(x => x.Winner == searchParams.Winner);
        }

        query.PageNumber(searchParams.PageNumber);
        query.PageSize(searchParams.PageSize);

        var result = await query.ExecuteAsync();

        return Ok(new
        {
            results = result.Results,
            pageCount = result.PageCount,
            totalCount = result.TotalCount
        });
    }
}