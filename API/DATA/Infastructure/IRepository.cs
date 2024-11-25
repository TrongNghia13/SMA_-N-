using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DATA.Infastructure
{
	public interface IRepository<TEntity> where TEntity : class
	{


		IQueryable<TEntity> _Table();
		// Marks an entity as new
		Task<TEntity> GetAsync(object ID);

		Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> filters);

		Task<List<TEntity>> GetAllAsync();

		Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filters);

		Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> filters);

		Task<bool> AnyAsync(int ID);

		Task<bool> AnyAsync(Expression<Func<TEntity, bool>> filters);

		Task<int> CountAsync(Expression<Func<TEntity, bool>> filters);

		Task CreateAsync(TEntity entity);

		Task CreateRangeAsync(List<TEntity> entities);

		Task UpdateAsync(TEntity entity);

		//void UpdateRangeAsync(List<TEntity> entities);

		Task DeleteAsync(TEntity entity);

        //Task GenerateToken(TEntity entity);

        Task DeleteRangeAsync(List<TEntity> entities);

        Task DeleteRangeAsync(Expression<Func<TEntity, bool>> filters);
	}
}
