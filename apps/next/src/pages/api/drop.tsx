import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

import { GatingType } from "app/types";

import { colors } from "design-system/tailwind/colors";

export const config = {
  runtime: "edge",
};
const baseURL = __DEV__
  ? "http://localhost:3000"
  : `https://${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN}`;

const fontSemiBold = fetch(`${baseURL}/assets/Inter-SemiBold.otf`).then((res) =>
  res.arrayBuffer()
);
const fontBold = fetch(`${baseURL}/assets/Inter-Bold.otf`).then((res) =>
  res.arrayBuffer()
);
const fontRegular = fetch(`${baseURL}/assets/Inter-Regular.otf`).then((res) =>
  res.arrayBuffer()
);
const getGatingTypeLinearGradient = (gatingType: GatingType) => {
  if (gatingType === "paid_nft") {
    return "linear-gradient(158deg, #F4CE5E 23.96%, #F4CE5E 54.12%, #F1A819 69.63%, #FFD480 82.36%, #FBC73F 91.83%, #F5E794 99.79%)";
  }
  return "linear-gradient(154deg, #00E786 0%, #4B27FE 36.26%, #B013D8 100%)";
};
const getGatingTypeTextColor = (gatingType: GatingType) => {
  if (gatingType === "paid_nft") {
    return colors.gray[900];
  }
  return "#FFF";
};
const getGatingTypeLabel = (gatingType: GatingType) => {
  if (gatingType === "paid_nft") {
    return "Collect to unlock channel";
  }
  if (
    gatingType === "multi_provider_music_presave" ||
    gatingType === "music_presave" ||
    gatingType === "spotify_presave"
  ) {
    return "Presave to collect";
  }
  if (
    gatingType === "spotify_save" ||
    gatingType === "multi_provider_music_save"
  ) {
    return "Save to collect";
  }
  return null;
};
const getGatingTypeIcon = (gatingType: GatingType) => {
  if (gatingType === "paid_nft") {
    return (
      <svg
        width="11"
        height="15"
        viewBox="0 0 11 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.645036"
          y="6.98573"
          width="9.14135"
          height="6.41097"
          rx="0.957251"
          fill="#FFD554"
          stroke="#FFD554"
          strokeWidth="1.27634"
        />
        <path
          d="M8.40292 6.57029V4.6385C8.41719 3.56629 7.80375 1.42188 5.23589 1.42188C2.95901 1.42188 2.19662 3.10782 2.05322 4.23737"
          stroke="#FFD554"
          strokeWidth="1.9145"
        />
      </svg>
    );
  }
  if (
    gatingType === "multi_provider_music_presave" ||
    gatingType === "music_presave" ||
    gatingType === "spotify_presave" ||
    gatingType === "spotify_save" ||
    gatingType === "multi_provider_music_save"
  ) {
    return (
      <svg
        width="16"
        height="21"
        viewBox="0 0 16 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.71437 1.87539L14.6306 0.0236241C15.3389 -0.123485 16.0004 0.435112 16 1.18002L15.992 15.4868C15.9911 17.0355 14.941 18.3733 13.4719 18.6971L13.0538 18.7892C11.5713 19.1159 10.1739 17.9507 10.1739 16.3879C10.1739 15.2511 10.9369 14.2656 12.0121 14.0135L13.8221 13.5892C14.4112 13.4512 14.8293 12.9112 14.8293 12.2884V5.80456C14.8293 5.35305 14.4276 5.01504 13.9985 5.10543L6.57303 6.66973C6.13873 6.76119 5.82688 7.15503 5.82688 7.61199V17.6021C5.82688 19.1484 4.79713 20.4925 3.33802 20.8506L3.0136 20.9303C1.47606 21.3076 0 20.1057 0 18.4763C0 17.3592 0.753937 16.3925 1.81226 16.1527L3.65964 15.7342C4.25311 15.5997 4.67589 15.0577 4.67589 14.4312V3.18318C4.67589 2.54796 5.11034 2.00084 5.71437 1.87539Z"
          fill="white"
        />
      </svg>
    );
  }

  return null;
};
const getGatingTypeColor = (gatingType: GatingType) => {
  if (gatingType === "paid_nft") {
    return "#FFD554";
  }

  return "#FFF";
};
export default async function handler(req: NextRequest) {
  const { search } = req.nextUrl;

  const paramsString = decodeURIComponent(search).replace(/&amp;/g, "&");
  const searchParams = new URLSearchParams(paramsString);
  const username = searchParams.get("username");
  const image = searchParams.get("image");
  const pfp = searchParams.get("pfp");
  const desc = searchParams.get("desc");
  const gatingType = searchParams.get("gatingType") as GatingType;

  const fontBoldData = await fontBold;
  const fontSemiBoldData = await fontSemiBold;
  const fontRegularData = await fontRegular;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          color: getGatingTypeTextColor(gatingType),
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            backgroundImage: getGatingTypeLinearGradient(gatingType),
          }}
        >
          <div
            style={{
              display: "flex",
              marginLeft: 40,
              width: 320,
              height: 320,
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
            }}
          >
            <img
              src={image}
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                objectFit: "cover",
              }}
            />
            {getGatingTypeLabel(gatingType) ? (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  height: "50px",
                  background: "#000",
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {getGatingTypeIcon(gatingType)}
                <p
                  style={{
                    color: getGatingTypeColor(gatingType),
                    fontSize: "18px",
                    fontWeight: 600,
                    lineHeight: "50px",
                    marginLeft: 8,
                  }}
                >
                  {getGatingTypeLabel(gatingType)}
                </p>
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              marginLeft: "20px",
              paddingRight: "40px",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              paddingTop: "32px",
              paddingBottom: "44px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={pfp}
                style={{
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  borderRadius: "999px",
                  marginRight: 8,
                }}
              />
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                @{username}
              </p>
            </div>
            <div
              style={{
                fontWeight: 400,
                fontSize: "22px",
                width: "auto",
                wordBreak: "break-word",
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                marginTop: "8px",
                // @ts-ignore
                "-webkit-line-clamp": 8,
                "-webkit-box-orient": "vertical",
              }}
            >
              {desc}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                lineHeight: "29px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  display: "flex",
                  marginRight: "8px",
                  lineHeight: "29px",
                  marginTop: "2px",
                }}
              >
                Collect on
              </div>
              <svg
                width="205"
                height="29"
                viewBox="0 0 205 29"
                fill={getGatingTypeTextColor(gatingType)}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M50.0905 3.19521C50.0905 3.11073 50.0221 3.04224 49.9377 3.04224H46.5776C46.4932 3.04224 46.4248 3.11073 46.4248 3.19521V23.6945C46.4248 23.779 46.4932 23.8475 46.5776 23.8475H49.9377C50.0221 23.8475 50.0905 23.779 50.0905 23.6945V12.0681C50.0905 11.9836 50.1588 11.9151 50.2432 11.9151H53.1452C54.8324 11.9151 56.1998 13.2849 56.1998 14.9747V23.6945C56.1998 23.779 56.2682 23.8475 56.3525 23.8475H59.7126C59.7975 23.8475 59.8659 23.779 59.8659 23.6945V14.9747C59.8659 11.2572 56.857 8.24356 53.1452 8.24356H50.2432C50.1588 8.24356 50.0905 8.17505 50.0905 8.09057V3.19521Z" />
                <path d="M112.407 8.70252C112.407 8.61798 112.476 8.54953 112.56 8.54953H115.92C116.004 8.54953 116.073 8.61798 116.073 8.70252V23.6945C116.073 23.779 116.004 23.8475 115.92 23.8475H112.56C112.476 23.8475 112.407 23.779 112.407 23.6945V8.70252Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M76.972 16.1985C76.972 20.5919 73.416 24.1535 69.0298 24.1535C64.6432 24.1535 61.0877 20.5919 61.0877 16.1985C61.0877 11.8051 64.6432 8.24356 69.0298 8.24356C73.416 8.24356 76.972 11.8051 76.972 16.1985ZM73.3065 16.1985C73.3065 18.5642 71.392 20.4819 69.0298 20.4819C66.6677 20.4819 64.7532 18.5642 64.7532 16.1985C64.7532 13.8328 66.6677 11.9151 69.0298 11.9151C71.392 11.9151 73.3065 13.8328 73.3065 16.1985Z"
                />
                <path d="M103.09 8.54953C103.174 8.54953 103.243 8.48103 103.243 8.39654V3.19521C103.243 3.11073 103.311 3.04224 103.395 3.04224H106.756C106.84 3.04224 106.908 3.11073 106.908 3.19521V8.39654C106.908 8.48103 106.977 8.54953 107.061 8.54953H110.422C110.506 8.54953 110.574 8.61798 110.574 8.70252V12.0681C110.574 12.1525 110.506 12.221 110.422 12.221H107.061C106.977 12.221 106.908 12.2895 106.908 12.374V18.3403C106.908 19.3541 107.729 20.176 108.741 20.176H110.422C110.506 20.176 110.574 20.2445 110.574 20.329V23.6945C110.574 23.779 110.506 23.8475 110.422 23.8475H108.741C105.704 23.8475 103.243 21.3818 103.243 18.3403V12.374C103.243 12.2895 103.174 12.221 103.09 12.221H100.952C100.867 12.221 100.799 12.1525 100.799 12.0681V8.70252C100.799 8.61798 100.867 8.54953 100.952 8.54953H103.09Z" />
                <path d="M36.497 8.54953C33.882 8.54953 31.7622 10.6728 31.7622 13.2919C31.7622 15.911 33.882 18.0343 36.497 18.0343H40.4681C41.0585 18.0343 41.5373 18.5137 41.5373 19.1051C41.5373 19.6966 41.0585 20.176 40.4681 20.176H31.9148C31.8305 20.176 31.7621 20.2445 31.7621 20.329V23.6945C31.7621 23.779 31.8305 23.8475 31.9148 23.8475H40.4681C43.0831 23.8475 45.2029 21.7243 45.2029 19.1051C45.2029 16.486 43.0831 14.3628 40.4681 14.3628H36.497C35.9065 14.3628 35.4278 13.8833 35.4278 13.2919C35.4278 12.7005 35.9065 12.221 36.497 12.221H44.1337C44.2181 12.221 44.2865 12.1525 44.2865 12.0681V8.70252C44.2865 8.61798 44.2181 8.54953 44.1337 8.54953H36.497Z" />
                <path d="M77.7638 8.54953C77.668 8.54953 77.5963 8.63626 77.6133 8.73032L80.3809 23.7223C80.3946 23.7949 80.4575 23.8475 80.5314 23.8475H86.5716C86.6449 23.8475 86.7084 23.7949 86.7215 23.7223L88.5939 13.5781C88.6251 13.4112 88.8637 13.4112 88.8943 13.5781L90.7673 23.7224C90.7804 23.7949 90.8433 23.8475 90.9172 23.8475L96.9574 23.8475C97.0313 23.8475 97.0942 23.7949 97.1079 23.7223L99.8749 8.73032C99.8924 8.63626 99.8202 8.54953 99.725 8.54953H96.3079C96.234 8.54953 96.1711 8.60217 96.1574 8.67467L94.0525 20.0803C94.0421 20.1357 93.9939 20.176 93.9376 20.176C93.8812 20.176 93.8325 20.1357 93.8227 20.0803L91.7172 8.67467C91.704 8.60217 91.6405 8.54953 91.5672 8.54953H85.9215C85.8482 8.54953 85.7847 8.60217 85.7716 8.67467L83.6661 20.0803C83.6557 20.1357 83.6076 20.176 83.5512 20.176C83.4948 20.176 83.4467 20.1357 83.4363 20.0803L81.3313 8.67467C81.3176 8.60217 81.2547 8.54953 81.1809 8.54953H77.7638Z" />
                <path d="M129.971 23.8475C130.056 23.8475 130.125 23.779 130.125 23.6945V12.374C130.125 12.2895 130.192 12.221 130.277 12.221H132.568C133.918 12.221 135.012 13.3169 135.012 14.6687V23.6945C135.012 23.779 135.08 23.8475 135.165 23.8475H138.525C138.609 23.8475 138.677 23.779 138.677 23.6945V14.6687C138.677 11.2892 135.942 8.54953 132.568 8.54953H118.058C117.974 8.54953 117.905 8.61798 117.905 8.70252V23.6945C117.905 23.779 117.974 23.8475 118.058 23.8475H121.419C121.503 23.8475 121.571 23.779 121.571 23.6945V12.374C121.571 12.2895 121.64 12.221 121.724 12.221H124.015C125.364 12.221 126.458 13.316 126.459 14.667V23.6945C126.459 23.779 126.527 23.8475 126.611 23.8475H129.971Z" />
                <path d="M112.407 4.1131C112.407 4.02861 112.475 3.96011 112.56 3.96011H115.92C116.004 3.96011 116.073 4.02861 116.073 4.1131V7.17269C116.073 7.25717 116.004 7.32568 115.92 7.32568H112.56C112.475 7.32568 112.407 7.25717 112.407 7.17269V4.1131Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M147.842 20.4819C145.977 20.4819 144.39 19.2858 143.806 17.6176C143.772 17.521 143.845 17.4224 143.947 17.4224H155.632C155.716 17.4224 155.784 17.3539 155.784 17.2694V16.1985C155.784 11.8051 152.228 8.24356 147.842 8.24356C143.455 8.24356 139.899 11.8051 139.899 16.1985C139.899 20.5919 143.455 24.1535 147.842 24.1535C150.008 24.1535 152.111 23.2828 153.677 21.9045C154.238 21.4104 154.746 20.8368 155.166 20.1977C155.219 20.1176 155.183 20.01 155.094 19.9752L151.835 18.7059C151.775 18.6825 151.707 18.6995 151.664 18.7473C151.539 18.885 151.403 19.0184 151.257 19.1464C150.307 19.9829 149.05 20.4819 147.842 20.4819ZM147.842 11.9151C149.707 11.9151 151.294 13.1112 151.878 14.7795C151.912 14.876 151.839 14.9747 151.737 14.9747H143.947C143.845 14.9747 143.772 14.876 143.806 14.7795C144.39 13.1112 145.977 11.9151 147.842 11.9151Z"
                />
                <path d="M20.8151 15.9767C21.2717 15.7806 21.2717 15.1321 20.8151 14.936L17.7511 13.6209C15.4169 12.6188 13.5569 10.7559 12.5565 8.41794L11.2434 5.34914C11.0476 4.8917 10.4002 4.8917 10.2044 5.34914L8.89135 8.41794C7.89095 10.7559 6.03096 12.6188 3.69672 13.6209L0.632813 14.936C0.176107 15.1321 0.176106 15.7806 0.632813 15.9767L3.69672 17.2918C6.03096 18.2938 7.89095 20.1568 8.89135 22.4948L10.2044 25.5636C10.4002 26.021 11.0476 26.021 11.2434 25.5635L12.5565 22.4948C13.5569 20.1568 15.4169 18.2938 17.7511 17.2918L20.8151 15.9767Z" />
                <path d="M167.007 10.3962L169.417 14.9873L171.888 10.3962H175.625L171.82 16.9623L175.727 23.5283H172.008L169.417 18.9885L166.87 23.5283H163.108L167.007 16.9623L163.245 10.3962H167.007ZM180.036 28.4528C179.574 28.4528 179.141 28.4158 178.736 28.3417C178.337 28.2733 178.007 28.1849 177.745 28.0766L178.566 25.3579C178.993 25.489 179.378 25.5602 179.72 25.5717C180.068 25.583 180.366 25.5033 180.617 25.3323C180.874 25.1613 181.082 24.8706 181.241 24.4602L181.455 23.9045L176.745 10.3962H180.575L183.293 20.0401H183.43L186.175 10.3962H190.03L184.926 24.9475C184.681 25.6543 184.348 26.2698 183.926 26.7942C183.51 27.3243 182.983 27.7318 182.344 28.0168C181.706 28.3075 180.936 28.4528 180.036 28.4528ZM191.826 23.5283V21.3567L198.255 13.3971V13.3031H192.048V10.3962H202.641V12.7644L196.605 20.5274V20.6215H202.863V23.5283H191.826Z" />
                <path d="M159.226 23.5283C160.435 23.5283 161.415 22.5484 161.415 21.3396C161.415 20.1308 160.435 19.1509 159.226 19.1509C158.018 19.1509 157.038 20.1308 157.038 21.3396C157.038 22.5484 158.018 23.5283 159.226 23.5283Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 400,
      fonts: [
        {
          name: "Inter",
          data: fontRegularData,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontSemiBoldData,
          weight: 600,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontBoldData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
