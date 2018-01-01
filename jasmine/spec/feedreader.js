/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    // First test suite named 'RSS Feeds'
    // This suite is all about the RSS feeds definitions.
    // the allFeeds variable in our application.
    describe('RSS Feeds', function() {

        // It tests to make sure that the allFeeds variable has been defined
        // and that it is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // It tests loops through each feed in the allFeeds object
        // and ensures it has a URL defined and that the URL is not empty.
         it('url of allFeeds are defined', function() {
            allFeeds.forEach(function(allFeeds) {
                expect(allFeeds.url).toBeDefined();
                expect(allFeeds.length).not.toBe(0);
            });
         });

        // It tests loops through each feed in the allFeeds object and ensures
        // it has a name defined
         it('names of allFeeds are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });
    });


    // Test suite named 'The menu'
    describe('The menu', function() {

        // It tests that ensures the menu element is hidden by default.
        // analyze the HTML and the CSS to determine how we're performing the
        // hiding/showing of the menu element.
         it('menu element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         // It tests that ensures the menu changes visibility when the menu icon is clicked.
         // two expectations: does the menu display when clicked and does it hide when clicked again.
        // Forum: https://discussions.udacity.com/t/menu-visibility-when-icon-is-clicked/183050/5
          it('menu changes visibility when clicked', function() {
              $('.menu-icon-link').click();
              expect($('body').hasClass('menu-hidden')).toBe(false);

              $('.menu-icon-link').click();
              expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });


    // Test suite named 'Initial Entries'
    describe('Initial Entries', function() {

        // It tests that ensures when the loadFeed function is called and completes its work.
        // at least a single .entry element within the .feed container.
        // loadFeed() is asynchronous so this test will require
        // the use of Jasmine's beforeEach and asynchronous done() function.
         beforeEach(function(done) {
            loadFeed(0, done);
         });

         it('at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).not.toBe(0);
         });
    });



    // Test suite named 'New Feed Selection'
    describe('New Feed Selection', function() {

        // It tests that ensures when a new feed is loaded by the loadFeed function
        // that the content actually changes. loadFeed() is asynchronous!
         var firstFeed;
         var secondFeed;

         beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();

                loadFeed(1, function() {
                    secondFeed = $('.feed').html();
                    done();
                })
            });
         });

         it('ensures when a new feed is loaded by the loadFeed function that the content changes', function() {
              expect(firstFeed).not.toEqual(secondFeed);
         });
    });
}());
