var baseUrl = process.env.BASE_IIGB_URL || 'http://localhost:3000';

describe('Accessibility testing', function() {

  beforeEach(function(done) {
    driver.get(baseUrl + '/int/setup-guide/open-a-business-account').then(function () {
      driver.executeAsyncScript(function(callback) {
        var script = document.createElement('script');
        script.innerHTML = 'document.documentElement.classList.add("axe-is-ready");';
        document.documentElement.appendChild(script);
        callback();
      })
      .then(function () {
        return driver.wait(selenium.until.elementsLocated(selenium.By.css('.axe-is-ready')));
      })
      .then(function(){
        done();
      });
    });
  });

  it('the open a business account page should be accessible', function (done) {
    AxeBuilder(driver)
      .analyze(function(results) {
        buildOutput("Open a business account page", results);
        expect(results.violations.length).toBe(0);
        done();
      })
  });
});