# SharePoint Lightbox Image Gallery Web Part

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

![drop](https://img.shields.io/badge/version-1.0.2-green.svg)

For more information see [CHANGELOG](CHANGELOG.md) file.

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview) Modern Site

## Disclaimer
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## License
Licensed under the [MIT](LICENSE.md) License.

## Minimal Path to Awesome
Either download [compiled package](https://github.com/chrobaktruhlik/spfx-lightbox-image-gallery/releases/latest) or build it yourself:

- Clone this repository
- Install development toolchain prerequisites<br><span style="font-style:italic;">The SharePoint Framework development and build toolchain leverages various popular open-source tools. While most dependencies are included in project, you need to install a few dependencies globally on your workstation.</span>

  - Install Gulp: `npm install gulp-cli --global`
  - Install Yeoman: `npm install yo --global`<br>Important: Yeoman v4.x is required by the SPFx v1.13 forward.
- In the command line (in a package directory) run:
  - Install the dependencies to the local node_modules folder: `npm install`
  - Create the solution package (sppkg) in sharepoint\solution folder: `npm run dist`

Install package:
- Add `spfx-lightbox-image-gallery.sppkg` to SharePoint AppCatalog and deploy
- Add the web part `Lightbox Image Gallery` to a SharePoint page and enjoy

Debug package:
- In command line run `npm run serve`, and then
- In Visual Studio Code: `Start Debugging – F5`