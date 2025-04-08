export const scripts = [
    {
      id: 5,
      value: "MIDCPNIFTY",
      strikeDifference: 75,
      lotSize: 50,
      expiryWeek: "MONDAY",
      name: "NIFTY MID SELECT",
      exchange: {
        id: 1,
        value: "NSE",
        expiryTime: "15:30:0",
      },
      scriptExpiries: [
        {
          id: 2,
          expiryType: "MONTHLY",
        },
      ],
    },
  ];
  
  export const exchanges = [
    { id: 1, value: "NSE", expiryTime: "15:30:0" },
    { id: 2, value: "BSE", expiryTime: "15:30:0" },
    { id: 3, value: "NFO", expiryTime: "15:30:0" },
    { id: 4, value: "CDS", expiryTime: "17:00:0" },
    { id: 5, value: "MCX", expiryTime: "23:30:0" },
    { id: 11, value: "BSE", expiryTime: "15:30:0" },
  ];
  