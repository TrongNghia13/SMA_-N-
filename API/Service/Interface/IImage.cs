using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IImage
    {
        Task<IEnumerable<Image>> GetAll();
        Task<Image> GetById(long id);

        Task<IEnumerable<Image>> GetItemIdById(string id);
        Task Add(ImageModel imageModel);
        Task Update(ImageModel imageModel);
        Task<bool> IsExists(long id);
        Task Delete(long id);
    }
}
