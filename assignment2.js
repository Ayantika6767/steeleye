function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    plainTextPositions.map((obj) => {
        // extracting text to be highlighted from plainText
        const text = plainText.substring(obj.start, obj.end);
        let textLen = text.length;
        // finding which occurrence of this word needs to be highlighted
        let occurrenceNo = 0, startIndx = 0, pos = 0;
        while((pos = plainText.indexOf(text, startIndx)) > -1) {
            occurrenceNo++;
            startIndx += pos + textLen;
            if(pos == obj.start) break;
        }
        // finding that occurrence in htmlContent
        startIndx = 0;
        while((pos = htmlContent.indexOf(text, startIndx)) > -1) {
            occurrenceNo--;
            startIndx += pos + textLen;
            if(occurrenceNo == 0) break;
        }
        // now pos has the position of the right occurrence in htmlContent
        if(pos >= 0) {
            // now highlight the correct string
            let contentLen = htmlContent.length;
            htmlContent = htmlContent.substring(0, pos) + "<mark>" + htmlContent.substring(pos, pos + textLen) + "</mark>" + htmlContent.substring(pos + textLen, contentLen);
        }
    });
    return htmlContent;
  }
  
  module.exports = highlightHTMLContent;
  
  // Test inputs
  const htmlContent = `<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>`;
  const plainText = "Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------";
  const plainTextPositions = [
  {
    start: 241,
    end: 247,
  },
  {
    start: 518,
    end: 525,
  },
  ];
  
  const result = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
  console.log(result);