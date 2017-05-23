var baseUrl = process.env.BASE_IIGB_URL || 'http://localhost:3000';

describe('Accessibility testing', function() {

  beforeEach(function(done) {
    driver.get(baseUrl + '/int/industries/creative/digital-media').then(function () {
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

  it('the digital media page should be accessible', function (done) {
    AxeBuilder(driver)
      .analyze(function(results) {
        buildOutput("Digital media page", results);
        expect(results.violations.length).toBe(0);
        done();
      })
  });
});