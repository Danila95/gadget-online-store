import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../db'

// Определение интерфейсов для моделей
interface UserAttributes {
    id: number;
    email: string;
    password: string;
    role: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role'> {}

interface BasketAttributes {
    id: number;
}

interface BasketCreationAttributes extends Optional<BasketAttributes, 'id'> {}

interface BasketDeviceAttributes {
    id: number;
}

interface BasketDeviceCreationAttributes extends Optional<BasketDeviceAttributes, 'id'> {}

interface DeviceAttributes {
    id: number;
    name: string;
    price: number;
    rating: number;
    img: string;
}

interface DeviceCreationAttributes extends Optional<DeviceAttributes, 'id' | 'rating'> {}

interface TypeAttributes {
    id: number;
    name: string;
}

interface TypeCreationAttributes extends Optional<TypeAttributes, 'id'> {}

interface BrandAttributes {
    id: number;
    name: string;
}

interface BrandCreationAttributes extends Optional<BrandAttributes, 'id'> {}

interface RatingAttributes {
    id: number;
    rate: number;
}

interface RatingCreationAttributes extends Optional<RatingAttributes, 'id'> {}

interface DeviceInfoAttributes {
    id: number;
    title: string;
    description: string;
}

interface DeviceInfoCreationAttributes extends Optional<DeviceInfoAttributes, 'id'> {}

interface TypeBrandAttributes {
    id: number;
}

interface TypeBrandCreationAttributes extends Optional<TypeBrandAttributes, 'id'> {}

// Определение моделей
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public role!: string;
}

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
        role: { type: DataTypes.STRING, defaultValue: 'USER' }
    },
    { sequelize, modelName: 'user' }
);

class Basket extends Model<BasketAttributes, BasketCreationAttributes> implements BasketAttributes {
    public id!: number;
}

Basket.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    { sequelize, modelName: 'basket' }
);

class BasketDevice extends Model<BasketDeviceAttributes, BasketDeviceCreationAttributes> implements BasketDeviceAttributes {
    public id!: number;
}

BasketDevice.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    { sequelize, modelName: 'basket_device' }
);

class Device extends Model implements DeviceAttributes {
    public id!: number;
    public name!: string;
    public price!: number;
    public rating!: number;
    public img!: string;
}

Device.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        price: { type: DataTypes.INTEGER, allowNull: false },
        rating: { type: DataTypes.INTEGER, defaultValue: 0 },
        img: { type: DataTypes.STRING, allowNull: false }
    },
    { sequelize, modelName: 'device' }
);

class Type extends Model<TypeAttributes, TypeCreationAttributes> implements TypeAttributes {
    public id!: number;
    public name!: string;
}

Type.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    { sequelize, modelName: 'type' }
);

class Brand extends Model<BrandAttributes, BrandCreationAttributes> implements BrandAttributes {
    public id!: number;
    public name!: string;
}

Brand.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    { sequelize, modelName: 'brand' }
);

class Rating extends Model<RatingAttributes, RatingCreationAttributes> implements RatingAttributes {
    public id!: number;
    public rate!: number;
}

Rating.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rate: { type: DataTypes.INTEGER, allowNull: false }
    },
    { sequelize, modelName: 'rating' }
);

class DeviceInfo extends Model<DeviceInfoAttributes, DeviceInfoCreationAttributes> implements DeviceInfoAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
}

DeviceInfo.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false }
    },
    { sequelize, modelName: 'device_info' }
);

class TypeBrand extends Model<TypeBrandAttributes, TypeBrandCreationAttributes> implements TypeBrandAttributes {
    public id!: number;
}

TypeBrand.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    { sequelize, modelName: 'type_brand' }
);

// // Установление связей между моделями
User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

Device.hasMany(Rating);
Rating.belongsTo(Device);

Device.hasMany(BasketDevice);
BasketDevice.belongsTo(Device);

Device.hasMany(DeviceInfo);
DeviceInfo.belongsTo(Device);

Type.belongsToMany(Brand, { through: TypeBrand });
Brand.belongsToMany(Type, { through: TypeBrand });

export {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    DeviceInfo,
    TypeBrand
};
