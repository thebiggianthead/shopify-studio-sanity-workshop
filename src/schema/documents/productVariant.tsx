import {CopyIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import ShopifyIcon from '../../components/icons/Shopify'
import ProductVariantHiddenInput from '../../components/inputs/ProductVariantHidden'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'

export default defineType({
  name: 'productVariant',
  title: 'Product variant',
  type: 'document',
  icon: CopyIcon,
  groups: [
    {
      name: 'shopifySync',
      title: 'Shopify sync',
      icon: ShopifyIcon,
    },
  ],
  fields: [
    // Variant dimensions
    defineField({
      name: 'dimensions',
      type: 'object',
      fields: [
        defineField({
          name: 'width',
          title: 'Width (mm)',
          type: 'number',
        }),
        defineField({
          name: 'height',
          title: 'Height (mm)',
          type: 'number',
        }),
      ],
    }),
    // Product variant hidden status
    defineField({
      name: 'hidden',
      type: 'string',
      components: {
        field: ProductVariantHiddenInput,
      },
      hidden: ({parent}) => {
        const isDeleted = parent?.store?.isDeleted

        return !isDeleted
      },
    }),
    // Shopify product variant
    defineField({
      name: 'store',
      title: 'Shopify',
      description: 'Variant data from Shopify (read-only)',
      type: 'shopifyProductVariant',
      group: 'shopifySync',
    }),
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      previewImageUrl: 'store.previewImageUrl',
      sku: 'store.sku',
      status: 'store.status',
      title: 'store.title',
    },
    prepare(selection) {
      const {isDeleted, previewImageUrl, sku, status, title} = selection

      return {
        media: (
          <ShopifyDocumentStatus
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="productVariant"
            url={previewImageUrl}
            title={title}
          />
        ),
        subtitle: sku,
        title,
      }
    },
  },
})
