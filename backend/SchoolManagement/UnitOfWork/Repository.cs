using Microsoft.EntityFrameworkCore;
using SchoolManagement.Context;
using System.Linq.Expressions;

namespace SchoolManagement.UnitOfWork
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        #region "FIELDS"

        protected DbContext Context { get; }
        protected DbSet<TEntity> DbSet { get; }

        #endregion

        #region "CTOR"

        public Repository(SchoolContext dataContext)
        {
            Context = dataContext;
            DbSet = Context.Set<TEntity>();
        }

        #endregion

        #region "METHODS"

        /// <summary>
        /// Get entity by identifier
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <returns>Entity</returns>
        public virtual async ValueTask<TEntity> FindById(object id)
        {
            return await DbSet.FindAsync(id);
        }

        /// <summary>
        /// Insert entity
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>The number of state entries written to the database.</returns>
        public virtual async Task<int> Insert(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            DbSet.Add(entity);

            return await Context.SaveChangesAsync();
        }

        /// <summary>
        /// Insert entities
        /// </summary>
        /// <param name="entities">Entities</param>
        /// <returns>The number of state entries written to the database.</returns>
        public virtual async Task<int> Insert(IEnumerable<TEntity> entities)
        {
            if (entities == null)
                throw new ArgumentNullException(nameof(entities));

            foreach (var entity in entities)
                DbSet.Add(entity);

            return await Context.SaveChangesAsync();
        }

        /// <summary>
        /// Update entity
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>The number of state entries written to the database.</returns>
        public virtual async Task<int> Update(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            return await Context.SaveChangesAsync();
        }

        /// <summary>
        /// Update entities
        /// </summary>
        /// <param name="entities">Entities</param>
        /// <returns>The number of state entries written to the database.</returns>
        public virtual async Task<int> Update(IEnumerable<TEntity> entities)
        {
            if (entities == null)
                throw new ArgumentNullException(nameof(entities));

            return await Context.SaveChangesAsync();
        }

        /// <summary>
        /// Delete entity
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>The number of state entries written to the database.</returns>
        public virtual async Task<int> Delete(TEntity entity)
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));

            DbSet.Remove(entity);

            return await Context.SaveChangesAsync();
        }

        /// <summary>
        /// Delete entities
        /// </summary>
        /// <param name="entities">Entities</param>
        /// <returns>The number of state entries written to the database.</returns>
        public virtual async Task<int> Delete(IEnumerable<TEntity> entities)
        {
            if (entities == null)
                throw new ArgumentNullException(nameof(entities));

            foreach (var entity in entities)
                DbSet.RemoveRange(entity);

            return await Context.SaveChangesAsync();
        }

        public async Task<bool> Any(Expression<Func<TEntity, bool>> predicate)
        {
            return await DbSet.AnyAsync(predicate);
        }



        #endregion

        #region "PROPERTIES"

        /// <summary>
        /// Gets a table
        /// </summary>
        public virtual IQueryable<TEntity> Table
        {
            get
            {
                return DbSet;
            }
        }

        /// <summary>
        /// Gets a table with "no tracking" enabled (EF feature) Use it only when you load record(s) only for read-only operations
        /// </summary>
        public virtual IQueryable<TEntity> TableNoTracking
        {
            get
            {
                return DbSet.AsNoTracking();
            }
        }

        #endregion
    }
}
