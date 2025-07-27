const BuyNowButton = ({ onClick }) => (
  <div className="mt-6 text-center">
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold"
    >
      Buy Now
    </button>
  </div>
);

export default BuyNowButton;
