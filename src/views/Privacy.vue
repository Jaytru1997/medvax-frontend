<script setup>
import PageHeader from "@/components/PageHeader.vue";
</script>
<template>
  <div class="min-h-screen text-dark font-inter">
    <!-- Page Header -->
    <PageHeader
      title="Privacy Policy"
      subtitle="MedVax Health is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or use our services."
    />
    <div class="flex flex-col items-center justify-center gap-8 my-12 px-4">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full xl:max-w-7xl">
        <h3 class="text-xl font-semibold mb-4">Privacy Policy</h3>
        <p class="text-sm mb-4">
          This privacy policy ("policy") describes the information Medvax Health
          ("we") collects when you visit and use our website ("the site",
          www.medvaxhealth.com), as well as how we use the data to support our
          features and services. By continuing to use the site, you acknowledge
          that you have reviewed this privacy policy, agree to its terms and you
          have consented to the use of your information such as personal data
          and device information, and the applicable disclosures.
        </p>
        <!-- Add more sections here as needed -->
        <h4 class="text-lg font-semibold mt-6 mb-2">Data we collect</h4>
        <p class="text-sm mb-4">
          Generally, we do not require any personal data when you visit our
          website only without using any of our services. When you decide to use
          our services or features, you are required to create and account and
          we collect various information to assist in providing you with our
          services and improve on existing features. You will be required to
          provide the details such as: Full name, Email, Password, Device token,
          Specialization, Phone number, Bio, Medical license image, User image,
          Age, Address and Card details (optional). We also collect certain
          information about your device when you visit the website, including
          information about your web browser, IP address, time zone, location
          and some of the cookies that are installed on your device.
        </p>
        <h4 class="text-lg font-semibold mt-6 mb-2">
          Why we collect your data?
        </h4>
        <p class="text-sm">
          We intend to use the information collected for the following purposes:
        </p>
        <ul class="list-disc pl-6 mb-4">
          <li>
            Account Management: To create and manage user accounts, allowing
            users to access and utilize the features and services offered by our
            platform.
          </li>
          <li>
            Communication: To facilitate communication with users, including
            responding to inquiries, providing support, and sending important
            updates or notifications related to their accounts or the services
            provided.
          </li>
          <li>
            Personalization: To personalize user experiences and tailor content,
            recommendations, and offerings based on user preferences, behaviors,
            and interactions with our platform.
          </li>
          <li>
            Improvement of Services: To analyze user data and feedback in order
            to improve the quality, functionality, and usability of our
            platform, as well as to develop new features and services that
            better meet user needs and preferences.
          </li>
        </ul>
        <h4 class="text-lg font-semibold mt-6 mb-2">
          Technologies we use to collect your data
        </h4>
        <p class="text-sm">
          We only use methods that ensure secure and efficient data transmission
          and processing. We do not use cookies for data collection. We collect
          data based on permissions granted by the users such as:
        </p>
        <ul class="list-disc pl-6">
          <li>Camera access</li>
          <li>Storage</li>
          <li>Location data</li>
        </ul>
        <ul class="list-disc pl-6">
          We also collect data using the following technologies:
          <li>HTTP requests</li>
          <li>RESTful API</li>
          <li>Authentication tokens and database queries (with MongoDB)</li>
          <li>
            Firebase Analytics (for Google search API), with the permission of
            users
          </li>
        </ul>
        <h4 class="text-lg font-semibold mt-6 mb-2">How we store your data</h4>
        <p class="text-sm mb-4">
          The information collected is stored securely within our project
          database, which is built on MongoDB. Our database infrastructure
          utilizes various cloud-based storage solutions. For this application,
          we have opted to host our data on Amazon Web Services (AWS), located
          in the Paris region.
        </p>
        <h4 class="text-lg font-semibold mt-6 mb-2">
          Safeguarding and securing the data
        </h4>
        <p class="text-sm mb-4">
          Your Personal Data shall be collected and processed in accordance with
          specific, legitimate and lawful purpose consented to by you provided
          that a further processing may be done only for archiving, scientific
          research, historical research or statistical purposes for public
          interest. We employ robust encryption techniques, leveraging tools
          such as crypto-js, to ensure the secure handling of critical
          information including bank details, passwords, and chat
          communications. Additionally, we implement strict authentication
          protocols utilizing Jsonwebtoken, which serves as a safeguard against
          unauthorized access attempts. These measures collectively uphold our
          commitment to safeguarding user data and maintaining the integrity and
          confidentiality of our platform.
        </p>
        <h4 class="text-lg font-semibold mt-6 mb-2">
          Right to restrict the collection of your personal data
        </h4>
        <p class="text-sm mb-4">
          At some point, you might wish to restrict the use and collection of
          your personal data. You can achieve this by doing the following:
        </p>
        <ul class="list-disc pl-6">
          <li>
            When you are filling the forms on the website, make sure to check if
            there is a box which you can leave unchecked, if you don't want to
            disclose your personal information.
          </li>
          <li>
            If you have already agreed to share your information with us, feel
            free to contact us via email and we will be more than happy to
            change this for you.
          </li>
        </ul>
        <h4 class="text-lg font-semibold mt-6 mb-2">
          Access to your data and right to make changes
        </h4>
        <p class="text-sm mb-4">
          You can access and update your information conveniently through our
          mobile application, ensuring transparency and control over their
          personal data. Here's a step-by-step process for accessing and making
          changes to your information:
        </p>
        <ul class="list-disc pl-6">
          <li>
            Accessing Information: You can initiate a request to view your
            information by tapping the 'Account' section within the mobile
            application. Upon submitting the request, the application
            communicates with the server to retrieve the requested information.
            If the request is successful, you will be provided with access to
            your data directly within the application.
          </li>
          <li>
            Updating Information: To make changes to your profile information,
            you can navigate to the 'Account' section within the mobile
            application and tap on the edit icon. Here, you can modify relevant
            details such as your full name, phone number, specialization and
            bio. Upon submitting the changes, the application sends an edit
            profile request to the server. If the request is successful, the
            updated information is seamlessly reflected in the database.
          </li>
          If you encounter any difficulties with this process or need
          assistance, you can contact our support team via email:
          support@medvax.com.
        </ul>
        <h4 class="text-lg font-semibold mt-6 mb-2">
          Third party access to data
        </h4>
        <p class="text-sm mb-4">
          We engage trusted third-party service providers to assist us in
          delivering our services effectively like Paystack and Nodemailer.
          These providers may have access to certain information solely for the
          purpose of performing tasks on our behalf, such as processing payments
          or providing customer support. We ensure that these service providers
          adhere to strict confidentiality and data protection standards.
        </p>
        <h4 class="text-lg font-semibold mt-6 mb-2">Data retention</h4>
        <p class="text-sm mb-4">
          The information you provide will be retained for as long as your
          account remains active. In the event that you deactivate your account,
          your data will be securely stored for a period of 30 days before being
          permanently deleted from our systems. This retention period ensures
          compliance with our data retention policies and allows you the
          opportunity to reactivate your account if desired.
        </p>
        <h4 class="text-lg font-semibold mt-6 mb-2">
          Remedy for violation of this policy
        </h4>
        <p class="text-sm mb-4">
          We are committed to protecting the data you provide us, in line with
          this policy. However, in the unlikely event that we violate this
          privacy policy, you may contact us to notify us of the violation and
          request redress. When notice of a violation is investigated and
          confirmed, the act or omission causing such violation shall be
          immediately corrected and an amicable settlement reached to compensate
          you where necessary. All claims for remedy shall be resolved not later
          than 30 days after the complaint was lodged.
        </p>
        <h4 class="text-lg font-semibold mt-6 mb-2">
          Notification of change of policy
        </h4>
        <p class="text-sm mb-4">
          When releasing a new version of the mobile app, we will include
          information about the updated privacy policy in the update description
          on the Apple App Store and Google Play Store. This ensures that you
          are informed before downloading or updating the app. In addition, once
          you open the app, a dialog box will pop up informing you of the
          changes to the privacy policy and prompting you to accept in order to
          continue using the MedVax Health application.
        </p>
        <h4 class="text-lg font-semibold mt-6 mb-2">Links to other websites</h4>
        <p class="text-sm mb-4">
          Our website contains links that lead to other websites. If you click
          on these links, MedVax Health is not held responsible for your data
          and privacy protection. Visiting those websites is not governed by
          this privacy policy agreement. Make sure to read the privacy policy
          documentation of the website you go to from our website.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
