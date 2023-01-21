import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  BigIntegerAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  UIDAttribute,
  SingleTypeSchema,
  RichTextAttribute,
  MediaAttribute,
  ComponentAttribute,
  TextAttribute,
  ComponentSchema,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access', 'custom']> &
      RequiredAttribute &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: DateTimeAttribute;
    permissions: RelationAttribute<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: DateTimeAttribute;
    lifespan: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminApiTokenPermission extends CollectionTypeSchema {
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    token: RelationAttribute<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginMenusMenu extends CollectionTypeSchema {
  info: {
    displayName: 'Menu';
    singularName: 'menu';
    pluralName: 'menus';
    tableName: 'menus';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    slug: UIDAttribute<'plugin::menus.menu', 'title'> & RequiredAttribute;
    items: RelationAttribute<
      'plugin::menus.menu',
      'oneToMany',
      'plugin::menus.menu-item'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::menus.menu',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::menus.menu',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginMenusMenuItem extends CollectionTypeSchema {
  info: {
    displayName: 'Menu Item';
    singularName: 'menu-item';
    pluralName: 'menu-items';
    tableName: 'menu_items';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    order: IntegerAttribute;
    title: StringAttribute & RequiredAttribute;
    url: StringAttribute;
    target: EnumerationAttribute<['_blank', '_parent', '_self', '_top']>;
    root_menu: RelationAttribute<
      'plugin::menus.menu-item',
      'manyToOne',
      'plugin::menus.menu'
    > &
      RequiredAttribute;
    parent: RelationAttribute<
      'plugin::menus.menu-item',
      'oneToOne',
      'plugin::menus.menu-item'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::menus.menu-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::menus.menu-item',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiAboutuspageAboutuspage extends SingleTypeSchema {
  info: {
    singularName: 'aboutuspage';
    pluralName: 'aboutuspages';
    displayName: 'R\u00F3lunk';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::aboutuspage.aboutuspage',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::aboutuspage.aboutuspage',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCategoryCategory extends CollectionTypeSchema {
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'categories';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    slug: UIDAttribute<'api::category.category', 'name'> & RequiredAttribute;
    image: MediaAttribute;
    products: RelationAttribute<
      'api::category.category',
      'oneToMany',
      'api::product.product'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiContactContact extends SingleTypeSchema {
  info: {
    singularName: 'contact';
    pluralName: 'contacts';
    displayName: 'Kapcsolat';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    email: StringAttribute;
    phone: StringAttribute;
    address: StringAttribute;
    content: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::contact.contact',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCookiePolicyCookiePolicy extends SingleTypeSchema {
  info: {
    singularName: 'cookie-policy';
    pluralName: 'cookie-policies';
    displayName: 'Cookie Szab\u00E1lyzat';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::cookie-policy.cookie-policy',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::cookie-policy.cookie-policy',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiDeliveryInformationDeliveryInformation
  extends SingleTypeSchema {
  info: {
    singularName: 'delivery-information';
    pluralName: 'delivery-informations';
    displayName: 'Sz\u00E1ll\u00EDt\u00E1si inform\u00E1ci\u00F3';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    pageContent: RichTextAttribute;
    frontpageContent: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::delivery-information.delivery-information',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::delivery-information.delivery-information',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiFrontpageSlideshowFrontpageSlideshow
  extends SingleTypeSchema {
  info: {
    singularName: 'frontpage-slideshow';
    pluralName: 'frontpage-slideshows';
    displayName: 'F\u0151oldal slideshow';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    slideshowItems: ComponentAttribute<'settings.homepage-slideshow', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::frontpage-slideshow.frontpage-slideshow',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::frontpage-slideshow.frontpage-slideshow',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMessageMessage extends CollectionTypeSchema {
  info: {
    singularName: 'message';
    pluralName: 'messages';
    displayName: 'messages';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    firmName: StringAttribute & RequiredAttribute;
    email: StringAttribute & RequiredAttribute;
    phone: StringAttribute & RequiredAttribute;
    message: TextAttribute & RequiredAttribute;
    seen: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::message.message',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::message.message',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiOfferOffer extends SingleTypeSchema {
  info: {
    singularName: 'offer';
    pluralName: 'offers';
    displayName: 'Aj\u00E1nlatk\u00E9r\u00E9s';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    text: TextAttribute;
    requestText: TextAttribute;
    sendMessageText: TextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::offer.offer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::offer.offer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPolicyPolicy extends SingleTypeSchema {
  info: {
    singularName: 'policy';
    pluralName: 'policies';
    displayName: 'Adatv\u00E9delmi nyilatkozat';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::policy.policy',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::policy.policy',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiPostPost extends CollectionTypeSchema {
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Posts';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute;
    excerpt: TextAttribute & RequiredAttribute;
    featuredImage: MediaAttribute & RequiredAttribute;
    content: RichTextAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::post.post', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::post.post', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiProductProduct extends CollectionTypeSchema {
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'products';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    slug: UIDAttribute<'api::product.product', 'name'> & RequiredAttribute;
    description: RichTextAttribute & RequiredAttribute;
    featuredImage: MediaAttribute & RequiredAttribute;
    available: BooleanAttribute & DefaultTo<true>;
    unit: IntegerAttribute & RequiredAttribute & DefaultTo<1>;
    pdf: MediaAttribute;
    variantAttributes: ComponentAttribute<'product.attribute-key', true> &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    variants: ComponentAttribute<'product.variant', true> &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    category: RelationAttribute<
      'api::product.product',
      'manyToOne',
      'api::category.category'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiSettingsBrochureSettingsBrochure extends SingleTypeSchema {
  info: {
    singularName: 'settings-brochure';
    pluralName: 'settings-brochures';
    displayName: 'Aktu\u00E1lis prospektus';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    brochure: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::settings-brochure.settings-brochure',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::settings-brochure.settings-brochure',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiSettingsSocialSettingsSocial extends SingleTypeSchema {
  info: {
    singularName: 'settings-social';
    pluralName: 'settings-socials';
    displayName: 'Socials be\u00E1ll\u00EDt\u00E1sok';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    facebook: ComponentAttribute<'settings.social'>;
    instagram: ComponentAttribute<'settings.social'>;
    youtube: ComponentAttribute<'settings.social'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::settings-social.settings-social',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::settings-social.settings-social',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTermTerm extends SingleTypeSchema {
  info: {
    singularName: 'term';
    pluralName: 'terms';
    displayName: '\u00C1SZF';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    content: RichTextAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::term.term', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::term.term', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ProductAttributeKey extends ComponentSchema {
  info: {
    displayName: 'Attribute key';
  };
  attributes: {
    key: StringAttribute & RequiredAttribute;
  };
}

export interface ProductAttributeValue extends ComponentSchema {
  info: {
    displayName: 'Attribute value';
  };
  attributes: {
    value: StringAttribute & RequiredAttribute;
  };
}

export interface ProductVariant extends ComponentSchema {
  info: {
    displayName: 'Variant';
    description: '';
  };
  attributes: {
    sku: StringAttribute & RequiredAttribute;
    price: IntegerAttribute & RequiredAttribute;
    priceNet: IntegerAttribute & RequiredAttribute;
    active: BooleanAttribute & DefaultTo<true>;
    image: MediaAttribute & RequiredAttribute;
    attributes: ComponentAttribute<'product.attribute-value', true> &
      RequiredAttribute;
  };
}

export interface SettingsHomepageSlideshow extends ComponentSchema {
  info: {
    displayName: 'Homepage Slideshow';
  };
  attributes: {
    title: StringAttribute;
    text: StringAttribute;
    buttonText: StringAttribute;
    buttonLink: StringAttribute;
    backgroundImage: MediaAttribute & RequiredAttribute;
  };
}

export interface SettingsSocial extends ComponentSchema {
  info: {
    displayName: 'Social';
  };
  attributes: {
    link: StringAttribute;
    show: BooleanAttribute & DefaultTo<true>;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::menus.menu': PluginMenusMenu;
      'plugin::menus.menu-item': PluginMenusMenuItem;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::aboutuspage.aboutuspage': ApiAboutuspageAboutuspage;
      'api::category.category': ApiCategoryCategory;
      'api::contact.contact': ApiContactContact;
      'api::cookie-policy.cookie-policy': ApiCookiePolicyCookiePolicy;
      'api::delivery-information.delivery-information': ApiDeliveryInformationDeliveryInformation;
      'api::frontpage-slideshow.frontpage-slideshow': ApiFrontpageSlideshowFrontpageSlideshow;
      'api::message.message': ApiMessageMessage;
      'api::offer.offer': ApiOfferOffer;
      'api::policy.policy': ApiPolicyPolicy;
      'api::post.post': ApiPostPost;
      'api::product.product': ApiProductProduct;
      'api::settings-brochure.settings-brochure': ApiSettingsBrochureSettingsBrochure;
      'api::settings-social.settings-social': ApiSettingsSocialSettingsSocial;
      'api::term.term': ApiTermTerm;
      'product.attribute-key': ProductAttributeKey;
      'product.attribute-value': ProductAttributeValue;
      'product.variant': ProductVariant;
      'settings.homepage-slideshow': SettingsHomepageSlideshow;
      'settings.social': SettingsSocial;
    }
  }
}
