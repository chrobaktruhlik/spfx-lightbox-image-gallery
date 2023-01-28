# SharePoint Lightroom Image Gallery Web Part

Fork from [YannickRe / spfx-lightbox-image-gallery](https://github.com/YannickRe/spfx-lightbox-image-gallery) version 1.0.0
## Summary

A SharePoint web part, created with SharePoint Framework (SPFx) that visualizes images/photos from a Document Library or Picture Library on a page. It uses the existing folder structure to create albums and puts them in the breadcrumb when opened. Clicking on an image opens a nice Lightbox effect for easy browsing the fullsized versions.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![directory](/assets/SPFxLightRoomImageGalleryWebPart.gif) 

Feature set:
1. Select SharePoint Picture/Document Library
2. Navigate through images and folders
3. Show breadcrumb to visualize context in the library
4. Show Lightbox effect for images, using [react-lightgallery](https://github.com/VLZH/react-lightgallery)

## Release Notes

![drop](https://img.shields.io/badge/version-1.0.1-green.svg)

For more information see [CHANGELOG](CHANGELOG.md) file.

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Disclaimer
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## License
Licensed under the [MIT](LICENSE.md) License.

## Minimal Path to Awesome
Either download [compiled package](https://github.com/chrobak.truhlik/spfx-lightbox-image-gallery/releases/latest) or build it yourself:
- Clone this repository
- In the command line run:
  - `npm install`
  - `npm run dist`

Install the package:
- Add to AppCatalog and deploy<br>`.\sharepoint\solution\spfx-lightbox-image-gallery.sppkg`
- Add the web part `Lightbox Image Gallery` to a SharePoint page