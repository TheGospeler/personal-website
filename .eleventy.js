module.exports = function (eleventyConfig) {
  // Passthrough copy static assets (but NOT data.js — that's generated)
  eleventyConfig.addPassthroughCopy("src/assets/style.css");
  eleventyConfig.addPassthroughCopy("src/assets/script.js");
  eleventyConfig.addPassthroughCopy("src/assets/john.jpg");
  eleventyConfig.addPassthroughCopy("src/assets/*.gif");
  eleventyConfig.addPassthroughCopy("src/downloads");

  // Passthrough copy all HTML files (they are static, not templates)
  eleventyConfig.addPassthroughCopy("src/**/*.html");

  return {
    // Only process .njk files as templates — HTML files are passthrough copied
    templateFormats: ["njk"],
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
  };
};
