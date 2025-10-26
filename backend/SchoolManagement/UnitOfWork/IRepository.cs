using System.Linq.Expressions;

namespace SchoolManagement.UnitOfWork
{
    public interface IRepository<TEntity> where TEntity : class
    {
        /// <summary>
        /// Find entity by identifier
        /// </summary>
        /// <param name="id">Identifier</param>
        /// <returns>Entity</returns>
        ValueTask<TEntity> FindById(object id);

        /// <summary>
        /// Insert entity
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>The number of state entries written to the database.</returns>
        Task<int> Insert(TEntity entity);

        /// <summary>
        /// Insert entities
        /// </summary>
        /// <param name="entities">Entities</param>
        /// <returns>The number of state entries written to the database.</returns>
        Task<int> Insert(IEnumerable<TEntity> entities);

        /// <summary>
        /// Update entity
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>The number of state entries written to the database.</returns>
        Task<int> Update(TEntity entity);

        /// <summary>
        /// Update entities
        /// </summary>
        /// <param name="entities">Entities</param>
        /// <returns>The number of state entries written to the database.</returns>
        Task<int> Update(IEnumerable<TEntity> entities);

        /// <summary>
        /// Delete entity
        /// </summary>
        /// <param name="entity">Entity</param>
        /// <returns>The number of state entries written to the database.</returns>
        Task<int> Delete(TEntity entity);

        /// <summary>
        /// Delete entities
        /// </summary>
        /// <param name="entities">Entities</param>
        /// <returns>The number of state entries written to the database.</returns>
        Task<int> Delete(IEnumerable<TEntity> entities);

        Task<bool> Any(Expression<Func<TEntity, bool>> predicate);

        /// <summary>
        /// Gets a table
        /// </summary>
        IQueryable<TEntity> Table { get; }

        /// <summary>
        /// Gets a table with "no tracking" enabled (EF feature) Use it only when you load record(s) only for read-only operations
        /// </summary>
        IQueryable<TEntity> TableNoTracking { get; }
    }
}
