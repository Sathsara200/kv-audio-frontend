import Footer from "../../components/footer";

export default function AboutUs() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="py-16 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-600">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            Welcome to our platform! We are passionate about delivering excellent service and creating meaningful experiences for our users.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white px-6 md:px-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              Our mission is to connect people through technology and help customers achieve their goals seamlessly. We strive to deliver user-friendly, secure, and efficient solutions that make life easier.
            </p>
          </div>
          <img
            src="/TeamWork.jpg"
            alt="Team working"
            className="rounded-lg shadow-md"
          />
        </div>
      </section>

      <section className="py-12 px-6 md:px-20 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-yellow-600 mb-6 text-center">Our Core Values</h2>
          <ul className="space-y-4 text-gray-700 text-lg list-disc list-inside">
            <li>Customer Focus: We listen, understand, and deliver.</li>
            <li>Innovation: We embrace change and encourage creativity.</li>
            <li>Integrity: We act with honesty and responsibility.</li>
            <li>Collaboration: We believe in the power of teamwork.</li>
          </ul>
        </div>
      </section>

      <section className="py-12 px-6 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-yellow-600 mb-6">Meet Our Team</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/Member1.png"
                alt="Team member"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-gray-500">Founder & CEO</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/Member2.png"
                alt="Team member"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">Jane Smith</h3>
              <p className="text-sm text-gray-500">Cordinator</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <img
                src="/Member3.png"
                alt="Team member"
                className="mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">Sam Lee</h3>
              <p className="text-sm text-gray-500">Manager</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
