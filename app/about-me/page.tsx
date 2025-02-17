import Image from 'next/image';

export default function AboutMePage() {
  return (
    <>
      <div className="max-w-full-content mx-auto pb-24">
        <div className="px-5">
          <div className="header-line my-8"></div>
          <h1 className="mb-7 mt-10 tracking-tighter">About Me</h1>
        </div>
      </div>
      <div className="bg-white w-full h-full pb-12">
        <div className="relative max-w-full-content mx-auto">
          <div
            className={`
            absolute
            top-[-100px]
            sm:right-0
            sm:w-[319px]
            h-[319px]
            overflow-hidden
            border-white
            border-8
            mx-5
            max-w-[calc(100%-50px)]`}
          >
            <Image
              width={500}
              height={500}
              src="/about-me.jpeg"
              alt="my pic"
              className="max-w-[unset]"
            />
          </div>
          <section className="min-h-max mx-5">
            <p className="text-sm flex-1 leading-7 sm:w-[calc(100%-319px)] sm:pt-24 pt-48">
              My name is Jane Doe and I am a personal coach. My goal is to
              assist people identify and overcome obstacles in their lives and
              to maximize their potential. Through my coaching, I help people
              set goals, build the confidence and skills they need to achieve
              success and develop a positive mindset and a sense of self-worth.
            </p>
            <p>&nbsp;</p>
            <p className="text-sm flex-1 leading-7">
              As the famous American author, salesman and motivational speaker
              Zig Ziglar once said: “Success is the doing, not the getting; in
              the trying, not the triumph. Success is a personal standard,
              reaching for the highest that is in us, becoming all that we can
              be. If we do our best, we are a success.
            </p>
            <div className="sm:flex pb-6">
              <section className="flex-1 pt-6">
                <h3 className="text-xl">Certifications</h3>
                <ul className="text-sm pt-6 list-disc list-inside leading-6">
                  <li>Name of Certification 1</li>
                  <li>Name of Certification 2</li>
                  <li>Name of Certification 3</li>
                </ul>
              </section>
              <section className="flex-1 pt-6">
                <h3 className="text-xl">Qualifications</h3>
                <ul className="text-sm pt-6 list-disc list-inside leading-6">
                  <li>Name of Qualification 1</li>
                  <li>Name of Qualification 2</li>
                  <li>Name of Qualification 3</li>
                </ul>
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
