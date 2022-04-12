import React from "react";

const NotificationPage = () => {
    return (
        <div className="py-5 bg-slate-50">
            <div className="max-w-[900px] w-full mx-auto px-3">
                <div className="p-5 bg-white">
                    <div className="font-bold">Notifications</div>
                    <div className="text-sm text-gray-500">Update your photo and personal details here.</div>
                </div>
                <hr />
                <div className="p-5 bg-white">
                    <div className="max-w-[400px] text-sm">
                        <label className="flex items-center gap-3 pl-1 cursor-pointer">
                            <input type="radio" value={0} name="setting" className="w-2 h-2 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                            <div className="">Send me an email for every donation or comment</div>
                        </label>
                        <label className="flex items-center gap-3 pl-1 mt-4 cursor-pointer">
                            <input type="radio" value={1} name="setting" className="w-2 h-2 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                            <div className="">Send me a daily highlight of donations and comments</div>
                        </label>
                        <label className="flex items-center gap-3 pl-1 mt-4 cursor-pointer">
                            <input type="radio" value={0} name="setting" className="w-2 h-2 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                            <div className="">Send me an email for every donation or comment</div>
                        </label>
                        <label className="flex items-center gap-3 pl-1 mt-4 cursor-pointer">
                            <input type="radio" value={0} name="setting" className="w-2 h-2 rounded-full appearance-none outline outline-1 outline-offset-4 checked:outline-teal-700 outline-gray-300 checked:bg-teal-700" />
                            <div className="">Send me an email for every donation or comment</div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationPage;