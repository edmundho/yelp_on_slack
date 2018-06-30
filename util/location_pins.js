
const imageUrlBuilder = function (locations) {
  const imageSize = '500x200';

  const url = `http://maps.googleapis.com/maps/api/staticmap?size=${imageSize}&scale=2&maptype=roadmap&`;

  const mapStyle = "style=feature:administrative.land_parcel|visibility:off&style=feature:administrative.neighborhood|visibility:off&&style=feature:poi|element:labels.text|visibility:on&style=feature:poi.attraction|visibility:off&style=feature:poi.business|visibility:off&style=feature:poi.government|visibility:off&style=feature:poi.medical|visibility:off&style=feature:poi.place_of_worship|visibility:off&style=feature:poi.school|visibility:off&style=feature:poi.sports_complex|visibility:off&style=feature:road|element:labels|visibility:on&style=feature:road.arterial|element:labels|visibility:on&style=feature:road.local|element:labels|visibility:on&style=feature:transit|visibility:off&style=feature:water&";
  const key = `key=AIzaSyAQKSDo0VMri-sNqXodTlNw9KcNQPJVOPc`;

  const firstBizLoc = `${locations[0].latitude},${locations[0].longitude}`;
  const secondBizLoc = `${locations[1].latitude},${locations[1].longitude}`;
  const thirdBizLoc = `${locations[2].latitude},${locations[2].longitude}`;

  const firstBizMark = `markers=anchor:center%7Clabel:1%7C${firstBizLoc}&`;
  const secondBizMark = `markers=anchor:center%7Clabel:2%7C${secondBizLoc}&`;
  const thirdBizMark = `markers=anchor:center%7Clabel:3%7C${thirdBizLoc}&`;


  return (url + mapStyle + firstBizMark + secondBizMark + thirdBizMark + key);
};

module.exports = imageUrlBuilder;