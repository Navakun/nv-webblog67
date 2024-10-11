module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Blog', {
        title: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.TEXT,
        content: DataTypes.TEXT,
        category: DataTypes.STRING,     
        status: DataTypes.STRING,
        brand_name: {
            type: DataTypes.STRING,
            allowNull: false, // ไม่อนุญาตให้ NULL
          },
          model: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          year_of_release: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          operating_system: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          screen_size: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false,
          },
    })
    return Blog
}