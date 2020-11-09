const slugify = ( text ) => {
        return text
        .toString()
        .toLowerCase()
        .replace(/s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^w-]+/g, "") // Remove all non-word chars
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, "") // Trim - from end of text 
      };
      
      class SkuData {
              data() {
                return {
                  permalink: "/data/sku/{{page.fileSlug}}.json"
                };
              }
            
              render(data) {
      
                let item = {}
                try {
                  const skus = {};
                  (data['sku-values'] || []).forEach( e => {
                    skus[e.property] = slugify(e.name)
                  })
                  item = {
                    "id": data.slug,
                    "price": data.price.value/100,
                    "compare-at-price": data['compare-at-price'],
                    "more-images": data['more-images'],
                    "image": data['main-image'].url || "",
                    "name": data.name,
                    "slug": data.slug,
                    "product": data.product,
                    "download-files": data['download-files'],
                    "sku-values": skus
                  }
                } catch(e) {
                  item = {}
                }
                
                return JSON.stringify(item);
              }
            }
            
            module.exports = SkuData;