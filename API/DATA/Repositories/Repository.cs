using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using DATA.Infastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;

namespace DATA.Repositories
{
	public class Repository<TDbContext, TEntity> : IRepository<TEntity> where TDbContext : DbContext where TEntity : class
	{
		private readonly TDbContext DbContext;
		private readonly DbSet<TEntity> DbSet;

		public Repository(TDbContext DbContext)
		{
			this.DbContext = DbContext;
			DbSet = this.DbContext.Set<TEntity>();
		}

		public IQueryable<TEntity> _Table()
		{
			return this.DbContext.Set<TEntity>();
		}

		public async Task<bool> AnyAsync(int ID)
		{
			var result = await DbSet.FindAsync(ID);
			return result != null;
		}

		public async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> filters)
		{
			return await DbSet.AnyAsync(filters);
		}

		public async Task<int> CountAsync(Expression<Func<TEntity, bool>> filters)
		{
			return await DbSet.CountAsync(filters);
		}


		public Task<List<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> filters)
		{
			return Task.FromResult(DbSet.Where(filters).ToList());
		}

		public Task<List<TEntity>> GetAllAsync()
		{
			return Task.FromResult(DbSet.ToList());
		}
		public async Task<TEntity> GetAsync(object ID)
		{
			return await DbSet.FindAsync(ID);
		}

		public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> filters)
		{
			return await DbSet.FirstOrDefaultAsync(filters);
			
		}

		public async Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> filters)
		{
			return await DbSet.SingleOrDefaultAsync(filters);

		}



		public async Task CreateAsync(TEntity entity)
		{
			 DbSet.Add(entity);
		}

		public async Task CreateRangeAsync(List<TEntity> entities)
		{
			await DbSet.AddRangeAsync(entities);
			await DbContext.SaveChangesAsync();
			
		}

		public async Task DeleteAsync(TEntity entity)
		{
			  DbSet.Remove(entity);				
		}

		public async Task DeleteRangeAsync(List<TEntity> entities)
		{
			DbSet.RemoveRange(entities);
			var result = await DbContext.SaveChangesAsync();
			
		}

		public async Task DeleteRangeAsync(Expression<Func<TEntity, bool>> filters)
		{
			var entities = await GetAllAsync(filters);
			 await DeleteRangeAsync(entities);
		}






		public async Task UpdateAsync(TEntity entity)
		{
			DbSet.Update(entity);
		
		}

        //public async Task<bool> UpdateRangeAsync(List<TEntity> entities)
        //{
        //	DbSet.UpdateRange(entities);
        //	var result = await DbContext.SaveChangesAsync();
        //	return Convert.ToBoolean(result);
        //}

       

    }
}
