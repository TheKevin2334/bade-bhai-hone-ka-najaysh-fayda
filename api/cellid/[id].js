export default async function handler(req, res) {

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: "Cell ID required"
    });
  }

  try {

    const body = new URLSearchParams({
      cellid: id
    });

    const response = await fetch(
      "https://guru.cyberyodha.org/request/bulkCellid",
      {
        method: "POST",
        headers: {
            "Host": "guru.cyberyodha.org",
            "Connection": "keep-alive",
            "Cache-Control": "max-age=0",
            "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "Origin": "https://guru.cyberyodha.org",
            "Content-Type": "application/x-www-form-urlencoded",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-User": "?1",
            "Sec-Fetch-Dest": "document",
            "Referer": "https://guru.cyberyodha.org/request/bulkCellid",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9",

            "Cookie": "ci_session=396e18e517ee1c45b1d6501b9af1261797b32475; _ga=GA1.1.1335773185.1773558874; __gads=ID=1b50e5db271c8716:T=1773558901:RT=1773558901:S=ALNI_MZA7GvXG4DJl5bqh2VeQG0SXAlvjw; __gpi=UID=0000121df4968140:T=1773558901:RT=1773558901:S=ALNI_Mbcg_bQ6uxNolEpLy4wp2r0_dYr_w; __eoi=ID=65c3a7e5bbf04097:T=1773558901:RT=1773558901:S=AA-AfjZestNirK9EOyIMZAs3Z6OE; FCCDCF=%5Bnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5B32%2C%22%5B%5C%2248e45359-8121-4509-9cc5-9dd1e78c298b%5C%22%2C%5B1773558902%2C611000000%5D%5D%22%5D%5D%5D; FCNEC=%5B%5B%22AKsRol9lyymliyAmH31XZlljsy7jUR450efiT2KQ2lro3GtdFhaxvImaQgk_UM5JT7BYzEbS47sW_QE1yQlE9O3I9FdZzFyNFU-4cuMqAiSp8G4reJYBDizpldQNsa6wQBjVfmV27MOzRzw3Cf-o1Q3tQ7vZ2EBtBA%3D%3D%22%5D%5D; _ga_CE4546Y4PV=GS2.1.s1773558873$o1$g1$t1773558942$j53$l0$h0"
        },
        body: body
      }
    );

    const html = await response.text();

    /* Extract rows.add data */
    const match = html.match(/rows\.add\((\[\[.*?\]\])\)/s);

    if (!match) {
      return res.status(404).json({
        error: "No data found"
      });
    }

    const rawData = match[1];
    const data = JSON.parse(rawData);

    const result = {
      cellid: data[0][3],
      owner: data[0][4],
      network: data[0][5],
      signal: data[0][6],
      latitude: data[0][7],
      longitude: data[0][8]
    };

    return res.status(200).json(result);

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}
