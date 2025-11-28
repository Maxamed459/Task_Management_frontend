export default function HelpPage() {
    return(
        <div className="p-4 mt-8">
            <h1 className="text-2xl font-bold mb-4">Help & Support</h1>
            <p className="mb-2">If you need assistance, please refer to the following resources:</p>
            <ul className="list-disc list-inside mb-4">
                <li><a href="/faq" className="text-blue-600 underline">Frequently Asked Questions</a></li>
                <li><a href="/contact" className="text-blue-600 underline">Contact Support</a></li>
                <li><a href="/documentation" className="text-blue-600 underline">Documentation</a></li>
            </ul>
            <p>We are here to help you with any issues or questions you may have.</p>
        </div>
    );
}