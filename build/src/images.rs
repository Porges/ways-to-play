use std::{
    collections::BTreeMap,
    path::{Path, PathBuf},
};

use eyre::{Context, OptionExt, Result};
use fast_image_resize::{create_srgb_mapper, images::Image, IntoImageView};
use image::{GenericImage, GenericImageView, ImageBuffer};

use crate::ImageManifestEntry;

struct ImageResolver {
    images: elsa::FrozenMap<PathBuf, Box<ImageManifestEntry>>,
}

impl ImageResolver {
    pub fn resolve(&self, path: &Path) -> Result<&ImageManifestEntry> {
        match self.images.get(path) {
            Some(entry) => Ok(entry),
            None => {
                let result = self.actual_resolve(path)?;
                Ok(self.images.insert(path.to_owned(), Box::new(result)))
            }
        }
    }

    fn actual_resolve(&self, path: &Path) -> Result<ImageManifestEntry> {
        let mut img = image::open(path).wrap_err("opening image")?;
        let mapper = create_srgb_mapper();
        mapper.forward_map_inplace(&mut img)?;

        let dst_width = 1024;
        let dst_height = 768;
        let mut dst_image = Image::new(
            dst_width,
            dst_height,
            img.pixel_type().ok_or_eyre("pixel type missing")?,
        );

        fast_image_resize::Resizer::new().resize(&img, &mut dst_image, None)?;
        mapper.backward_map_inplace(&mut dst_image)?;

        todo!()
    }
}
